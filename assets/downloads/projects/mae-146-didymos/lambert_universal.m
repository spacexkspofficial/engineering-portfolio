function [v1, v2, residual] = lambert_universal(r1, r2, tof, MU, cw, eps, tol)
    arguments (Input)
        r1  (3,1) double    % initial position vector
        r2  (3,1) double    % final position vector
        tof (1,1) double    % time of flight
        MU  (1,1) double    % gravitational parameter
        cw  (1,1) double    % whether to use clockwise path, 0 or 1
        eps (1,1) double    % tolerance for Stumpff functions near 0
        tol (1,1) double    % tolerance on root-solving
    end
    
    arguments (Output)
        v1 (3,1) double         % initial velocity vector
        v2 (3,1) double         % final velocity vector
        residual (1,1) double   % residual on converged root-solving problem
    end
    
    % Compute magnitudes of position vectors
    r1_mag = norm(r1);
    r2_mag = norm(r2);
    
    % Compute cross product and dot product
    cross_vec = cross(r1, r2);
    dot_val = dot(r1, r2);
    
    % Calculate change in true anomaly
    dtheta = acos(max(-1, min(1, dot_val / (r1_mag * r2_mag))));
    
    % Resolve quadrant ambiguity
    if cw == 0
        if cross_vec(3) < 0
            dtheta = 2 * pi - dtheta;
        end
    else
        if cross_vec(3) >= 0
            dtheta = 2 * pi - dtheta;
        end
    end
    
    % Compute the A parameter
    A = sin(dtheta) * sqrt((r1_mag * r2_mag) / (1 - cos(dtheta)));
    
    % Bisection method (Extremely robust, guaranteed convergence)
    z_low = -1000;              % Lower bound (highly hyperbolic)
    z_up  = 4 * pi^2 - 1e-6;    % Upper bound (highly elliptical, single rev)
    z = 0;                      % Initial guess (parabolic)
    
    max_iter = 500; 
    iter = 0;
    
    while iter < max_iter
        % Evaluate Stumpff functions
        [C, S] = stumpff(z, eps);
        
        % Compute y variable
        y = r1_mag + r2_mag + A * (z * S - 1) / sqrt(C);
        
        % y must be positive for a physical orbit. If negative, z is too low.
        if y < 0
            z_low = z;
            z = (z_low + z_up) / 2;
            iter = iter + 1;
            continue;
        end
        
        % Compute calculated time of flight
        tof_calc = ((y / C)^1.5 * S + A * sqrt(y)) / sqrt(MU);
        
        % Check residual
        F = tof_calc - tof;
        if abs(F) < tol
            break;
        end
        
        % Update bisection bounds
        if F > 0
            z_up = z;  % Calculated TOF too high -> z is too high
        else
            z_low = z; % Calculated TOF too low -> z is too low
        end
        
        % Next guess
        z = (z_low + z_up) / 2;
        iter = iter + 1;
    end
    
    if iter >= max_iter
        error('Lambert solver failed to converge within %d iterations.', max_iter);
    end
    
    % Final computation of f and g parameters
    [C, S] = stumpff(z, eps);
    y = r1_mag + r2_mag + A * (z * S - 1) / sqrt(C);
    
    f = 1 - y / r1_mag;
    g = A * sqrt(y / MU);
    g_dot = 1 - y / r2_mag;
    
    % Compute initial and final velocity vectors
    v1 = (r2 - f * r1) / g;
    v2 = (g_dot * r2 - r1) / g;
    
    % Output the final absolute residual
    residual = abs(F);
end