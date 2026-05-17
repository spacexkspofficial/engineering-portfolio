% Supermassive Black Hole - Idealized Critical Capture Visualization
% Combines Physics (Red/Yellow) with an Analytic Path for the Limit (Cyan)
clear; clc; close all;

% =========================================================================
%                         USER PARAMETERS
% =========================================================================
M_solar      = 4e6;       % Mass (Solar Masses)
G_const      = 39.478;    % Gravitational Constant
c_speed      = 63241;     % Speed of Light (AU/yr)

dt           = 1e-6;      % Time step
max_steps    = 30000;     % Physics simulation duration
start_dist   = -0.8;      % Source X position (AU)
zoom_val     = 0.5;       % Zoom level (AU)
% =========================================================================

% --- Derived Constants ---
Rs = 2 * G_const * M_solar / c_speed^2;     % Schwarzschild Radius
b_crit = (3 * sqrt(3) / 2) * Rs;            % Critical Impact Parameter (~2.6 Rs)
r_photon = 1.5 * Rs;                        % Photon Sphere Radius

% --- Setup Figure ---
f = figure('Color', 'k', 'Position', [100 100 1100 900]);
hold on; axis equal; grid on;
set(gca, 'Color', 'k', 'XColor', [0.3 0.3 0.3], 'YColor', [0.3 0.3 0.3], ...
    'ZColor', [0.3 0.3 0.3], 'FontSize', 10);
xlabel('Distance (AU)'); ylabel('Distance (AU)');

% Titles
title({ 'Critical Capture Limit (Idealized)', ...
       sprintf('Mass: %.1e M_{sun}  |  Critical Impact: %.4f AU', M_solar, b_crit)}, ...
       'Color', 'w', 'FontWeight', 'bold');

% --- Draw Geometry ---
% 1. Event Horizon (Black Sphere)
[sx, sy, sz] = sphere(80);
surf(sx*Rs, sy*Rs, sz*Rs, 'FaceColor', 'k', 'EdgeColor', [0.2 0.2 0.2]);

% 2. Photon Sphere (Orange Ring)
theta = linspace(0, 2*pi, 300);
plot3(r_photon*cos(theta), r_photon*sin(theta), zeros(size(theta)), ...
    'Color', [1 0.5 0], 'LineStyle', '--', 'LineWidth', 1);

% =========================================================================
%   PART A: PHYSICS ENGINE (Red & Yellow Photons)
% =========================================================================

% 1. Red (Captured)
y_captured = linspace(0.05*Rs, b_crit * 0.90, 8);
% 2. Yellow (Escaping)
y_escaping = linspace(b_crit * 1.15, b_crit * 2.5, 8);

all_y = [y_captured, y_escaping];
types = [ones(1,8), ones(1,8)*3]; % 1=Red, 3=Yellow

for i = 1:length(all_y)
    pos = [start_dist, all_y(i), 0];
    vel = [c_speed, 0, 0];
    path = zeros(max_steps, 3);
    path(1,:) = pos;
    
    idx_end = max_steps;
    
    for t = 2:max_steps
        r_vec = pos; r = norm(r_vec);
        
        if r < Rs, idx_end = t-1; break; end % Hit
        
        acc_dir = -r_vec / r;
        acc_mag = (G_const * M_solar) / ((r - Rs)^2); % Paczynski-Wiita
        
        vel = vel + acc_dir * acc_mag * dt;
        vel = vel / norm(vel) * c_speed; 
        pos = pos + vel * dt;
        path(t,:) = pos;
        
        if r > 1.2 && dot(vel, r_vec) > 0, idx_end = t; break; end % Escape
    end
    
    p = path(1:idx_end, :);
    if types(i) == 1
        plot3(p(:,1), p(:,2), p(:,3), 'Color', [0.8 0 0], 'LineWidth', 1);
        plot3(p(end,1), p(end,2), p(end,3), 'rx', 'MarkerSize', 6);
    else
        plot3(p(:,1), p(:,2), p(:,3), 'Color', [0.9 0.9 0], 'LineWidth', 1);
    end
end

% =========================================================================
%   PART B: ANALYTIC PLOT (The Ideal Cyan Photon)
%   Manual construction to avoid infinities
% =========================================================================

% Segment 1: Approach (Straight line curving in)
% We use a simple decay function to blend from straight line to circle
t_app = linspace(start_dist, 0, 200); 
x_app = t_app;
% Blend y from b_crit down to r_photon (1.5 Rs)
decay = exp(t_app * 5); % Sharp curve near 0
y_app = b_crit * (1-decay) + r_photon * decay; 

% Segment 2: The Orbit (Wrapping around)
% Circular arc starting from 90 degrees (top) wrapping to -180 (bottom-left)
angles = linspace(pi/2, -pi, 100); 
x_orb = r_photon * cos(angles);
y_orb = r_photon * sin(angles);

% Segment 3: The Plunge (Spiral in to Rs)
% Spiral from -pi to -pi - pi/2 (another quarter turn in)
angles_in = linspace(-pi, -1.5*pi, 50);
radii_in  = linspace(r_photon, Rs*0.9, 50); % Radius shrinks to inside hole
x_in = radii_in .* cos(angles_in);
y_in = radii_in .* sin(angles_in);

% Combine and Plot
cx = [x_app, x_orb, x_in];
cy = [y_app, y_orb, y_in];
cz = zeros(size(cx));

plot3(cx, cy, cz, 'c-', 'LineWidth', 2.5);
plot3(cx(end), cy(end), cz(end), 'cx', 'MarkerSize', 10, 'LineWidth', 2);

% --- Dynamic Labels for the Cyan Line ---

% Label 1: Start
text(start_dist, b_crit + 0.02, 0, ...
    sprintf('Aim: b_{crit} = %.4f AU', b_crit), ...
    'Color', 'c', 'FontSize', 10, 'FontWeight', 'bold');

% Label 2: The Spiral
% Pick a point on the "Orbit" segment
lbl_idx = round(length(x_app) + length(x_orb)*0.5); 
text(cx(lbl_idx)+0.02, cy(lbl_idx)+0.02, 0, ...
     sprintf('\\leftarrow Limit Cycle\n(Wraps & Falls In)'), ...
     'Color', 'c', 'FontSize', 10, 'FontWeight', 'bold');

% --- Final View ---
view(0, 90);
axis([-zoom_val zoom_val -zoom_val zoom_val]);