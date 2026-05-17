function ta = ma2ta(e, ma)
    arguments (Input)
        e  (1,1) double     % eccentricity
        ma (1,1) double     % mean anomaly
    end
    
    arguments (Output)
        ta (1,1) double    % true anomaly
    end
    
    % Wrap mean anomaly to [0, 2*pi] to prevent solver divergence
    ma = mod(ma, 2*pi);
    
    % Set initial guess for Newton-Raphson method
    if e < 0.8
        E = ma; 
    else
        E = pi; % Better guess for highly eccentric orbits
    end
    
    tol = 1e-12;
    diff_val = 1.0;
    max_iter = 100;
    iter = 0;
    
    % Iteratively solve Kepler's equation for Eccentric Anomaly (E)
    while abs(diff_val) > tol && iter < max_iter
        f_val = E - e * sin(E) - ma;
        f_prime = 1 - e * cos(E);
        diff_val = f_val / f_prime;
        E = E - diff_val;
        iter = iter + 1;
    end
    
    % Compute sine and cosine of true anomaly
    sin_ta = (sqrt(1 - e^2) * sin(E)) / (1 - e * cos(E));
    cos_ta = (cos(E) - e) / (1 - e * cos(E));
    
    % Resolve quadrant ambiguity for true anomaly
    ta = atan2(sin_ta, cos_ta);
end