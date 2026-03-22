% problem4_didymos.m
% Preliminary mission analysis for Earth to Didymos transfer
clear; close all; clc;

% Constants
AU = 149.6e6;             % 1 AU in km
MU = 132712000000;        % Gravitational parameter in km^3/s^2
day2sec = 86400;          % 1 day in seconds

% Reference Keplerian Elements at t_ref [a, e, i, W, w, ta]
kep_earth_ref = [1.00000011 * AU; 
                 0.016710212; 
                 deg2rad(0.00005); 
                 deg2rad(-11.26064); 
                 deg2rad(102.94719); 
                 deg2rad(100.46435)];

kep_didymos_ref = [1.6442 * AU; 
                   0.38385; 
                   deg2rad(3.4079); 
                   deg2rad(73.196); 
                   deg2rad(319.321); 
                   deg2rad(195.0)];

% Convert reference elements to Cartesian state vectors
rv_earth_ref = kep2rv(kep_earth_ref, MU);
rv_didymos_ref = kep2rv(kep_didymos_ref, MU);


%% (a) Earth at t = t_ref + 12 days
t_earth = 12 * day2sec;
rv_earth_dep = propagate_elliptical(rv_earth_ref, t_earth, MU);

fprintf('--- (a) Earth state at t_ref + 12 days ---\n');
fprintf('Position (km): [%.4f, %.4f, %.4f]\n', rv_earth_dep(1:3));
fprintf('Velocity (km/s): [%.4f, %.4f, %.4f]\n\n', rv_earth_dep(4:6));


%% (b) Didymos at t = t_ref + 412 days
t_didymos = 412 * day2sec;
rv_didymos_arr = propagate_elliptical(rv_didymos_ref, t_didymos, MU);

fprintf('--- (b) Didymos state at t_ref + 412 days ---\n');
fprintf('Position (km): [%.4f, %.4f, %.4f]\n', rv_didymos_arr(1:3));
fprintf('Velocity (km/s): [%.4f, %.4f, %.4f]\n\n', rv_didymos_arr(4:6));


%% (c) Nominal Transfer (12 days to 412 days)
r1_nom = rv_earth_dep(1:3);
v1_earth = rv_earth_dep(4:6);
r2_nom = rv_didymos_arr(1:3);
v2_didymos = rv_didymos_arr(4:6);
tof_nom = t_didymos - t_earth;

% Solve Lambert's problem for nominal transfer
[v1_trans, v2_trans, ~] = lambert_universal(r1_nom, r2_nom, tof_nom, MU, 0, 1e-8, 1e-8);

% Calculate total Delta V
dV_dep = norm(v1_trans - v1_earth);
dV_arr = norm(v2_trans - v2_didymos);
dV_tot_nom = dV_dep + dV_arr;

fprintf('--- (c) Nominal Transfer ---\n');
fprintf('Total Delta V: %.4f km/s\n\n', dV_tot_nom);

% Pre-calculate orbits for plotting
P_earth = 2 * pi * sqrt(kep_earth_ref(1)^3 / MU);
t_plot_e = linspace(0, P_earth, 200);
orb_earth = zeros(3, 200);
for k = 1:200
    rv_tmp = propagate_elliptical(rv_earth_ref, t_plot_e(k), MU);
    orb_earth(:,k) = rv_tmp(1:3);
end

P_didymos = 2 * pi * sqrt(kep_didymos_ref(1)^3 / MU);
t_plot_d = linspace(0, P_didymos, 200);
orb_didymos = zeros(3, 200);
for k = 1:200
    rv_tmp = propagate_elliptical(rv_didymos_ref, t_plot_d(k), MU);
    orb_didymos(:,k) = rv_tmp(1:3);
end

t_trans = linspace(0, tof_nom, 100);
orb_trans = zeros(3, 100);
rv_trans_0 = [r1_nom; v1_trans];
for k = 1:100
    rv_tmp = propagate_elliptical(rv_trans_0, t_trans(k), MU);
    orb_trans(:,k) = rv_tmp(1:3);
end

% Plot Nominal Transfer
figure(1); hold on; grid on; view(3);
title(sprintf('(c) Earth to Didymos Transfer (dV = %.3f km/s)', dV_tot_nom));
xlabel('x (km)'); ylabel('y (km)'); zlabel('z (km)');

plot3(orb_earth(1,:), orb_earth(2,:), orb_earth(3,:), 'Color', '#0072BD', 'LineWidth', 1.5, 'DisplayName', 'Earth Orbit');
plot3(orb_didymos(1,:), orb_didymos(2,:), orb_didymos(3,:), 'Color', '#D95319', 'LineWidth', 1.5, 'DisplayName', 'Didymos Orbit');
plot3(orb_trans(1,:), orb_trans(2,:), orb_trans(3,:), 'Color', '#EDB120', 'LineWidth', 2, 'DisplayName', 'Transfer Orbit');

scatter3(r1_nom(1), r1_nom(2), r1_nom(3), 80, 'MarkerEdgeColor', '#7E2F8E', 'Marker', 'o', 'LineWidth', 2, 'DisplayName', 'Earth @ dep');
scatter3(r2_nom(1), r2_nom(2), r2_nom(3), 80, 'MarkerEdgeColor', '#77AC30', 'Marker', 'o', 'LineWidth', 2, 'DisplayName', 'Didymos @ arr');
scatter3(0, 0, 0, 100, 'y*', 'DisplayName', 'Sun');
legend('Location', 'northeast');


%% (d) Porkchop Plot
t0_grid = 0:5:1000;
tf_grid = 0:5:1000;
[T0, TF] = meshgrid(t0_grid, tf_grid);
dV_map = NaN(size(T0));

rv_e_all = zeros(6, length(t0_grid));
rv_d_all = zeros(6, length(tf_grid));

for i = 1:length(t0_grid)
    rv_e_all(:,i) = propagate_elliptical(rv_earth_ref, t0_grid(i) * day2sec, MU);
end
for j = 1:length(tf_grid)
    rv_d_all(:,j) = propagate_elliptical(rv_didymos_ref, tf_grid(j) * day2sec, MU);
end

for i = 1:length(t0_grid)
    for j = 1:length(tf_grid)
        dt_days = tf_grid(j) - t0_grid(i);
        if dt_days > 100
            r1_pc = rv_e_all(1:3, i);
            v1_e = rv_e_all(4:6, i);
            r2_pc = rv_d_all(1:3, j);
            v2_d = rv_d_all(4:6, j);
            
            try
                [v1_lam, v2_lam, ~] = lambert_universal(r1_pc, r2_pc, dt_days * day2sec, MU, 0, 1e-8, 1e-8);
                dV_calc = norm(v1_lam - v1_e) + norm(v2_lam - v2_d);
                dV_map(j, i) = dV_calc;
            catch
                % Fill uncomputed high-energy/multi-rev regions with 100 to color them yellow
                dV_map(j, i) = 100;
            end
        end
    end
end

figure(2); hold on;
set(gca, 'Color', 'k'); % Make background completely black
% Plot contour with white lines to match your friends' plot style
contourf(T0, TF, dV_map, 0:2:100, 'LineColor', [0.8 0.8 0.8]); 
caxis([0 100]); 
colorbar;
title('(d) Porkchop Plot: Total \Delta V (km/s)');
xlabel('Departure t0 (days after tref)');
ylabel('Arrival tf (days after tref)');

% Find minimum dV (ignoring the 100s we just added)
temp_map = dV_map;
temp_map(temp_map >= 100) = NaN;
[min_dV, min_idx] = min(temp_map(:));
[row_min, col_min] = ind2sub(size(temp_map), min_idx);
t0_opt = t0_grid(col_min);
tf_opt = tf_grid(row_min);

plot(t0_opt, tf_opt, 'wp', 'MarkerSize', 14, 'MarkerFaceColor', 'r', 'DisplayName', 'Optimal Transfer');
legend('Location', 'northwest');

fprintf('--- (d) Optimal Transfer from Porkchop ---\n');
fprintf('Minimum Delta V: %.4f km/s\n', min_dV);
fprintf('Departure: t_ref + %d days\n', t0_opt);
fprintf('Arrival: t_ref + %d days\n\n', tf_opt);


%% (e) 3D Trajectory of Optimal Transfer
r1_opt = rv_e_all(1:3, col_min);
r2_opt = rv_d_all(1:3, row_min);
tof_opt = (tf_opt - t0_opt) * day2sec;

[v1_opt, ~, ~] = lambert_universal(r1_opt, r2_opt, tof_opt, MU, 0, 1e-8, 1e-8);

figure(3); hold on; grid on; view(3);
title(sprintf('(e) Optimal Transfer from Porkchop (t0=%d d, tf=%d d, dV=%.3f km/s)', t0_opt, tf_opt, min_dV));
xlabel('x (km)'); ylabel('y (km)'); zlabel('z (km)');

plot3(orb_earth(1,:), orb_earth(2,:), orb_earth(3,:), 'Color', '#0072BD', 'LineWidth', 1.5, 'DisplayName', 'Earth Orbit');
plot3(orb_didymos(1,:), orb_didymos(2,:), orb_didymos(3,:), 'Color', '#D95319', 'LineWidth', 1.5, 'DisplayName', 'Didymos Orbit');

t_opt_plot = linspace(0, tof_opt, 100);
orb_opt = zeros(3, 100);
rv_opt_0 = [r1_opt; v1_opt];
for k = 1:100
    rv_tmp = propagate_elliptical(rv_opt_0, t_opt_plot(k), MU);
    orb_opt(:,k) = rv_tmp(1:3);
end
plot3(orb_opt(1,:), orb_opt(2,:), orb_opt(3,:), 'Color', '#EDB120', 'LineWidth', 2, 'DisplayName', 'Transfer Orbit');

scatter3(r1_opt(1), r1_opt(2), r1_opt(3), 80, 'MarkerEdgeColor', '#7E2F8E', 'Marker', 'o', 'LineWidth', 2, 'DisplayName', 'Earth @ dep');
scatter3(r2_opt(1), r2_opt(2), r2_opt(3), 80, 'MarkerEdgeColor', '#77AC30', 'Marker', 'o', 'LineWidth', 2, 'DisplayName', 'Didymos @ arr');
scatter3(0, 0, 0, 100, 'y*', 'DisplayName', 'Sun');

legend('Location', 'northeast');