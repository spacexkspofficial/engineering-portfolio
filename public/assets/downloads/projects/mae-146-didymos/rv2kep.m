function kep = rv2kep(rv, MU)
    arguments (Input)
        rv (6,1) double     % cartesian vector
        MU (1,1) double     % gravitational parameter
    end
    
    arguments (Output)
        kep (6,1) double    % Keplerian elements vector [a; e; i; W; w; ta]
    end
    
    % Extract position and velocity vectors
    r_vec = rv(1:3);
    v_vec = rv(4:6);
    
    % Compute magnitudes
    r = norm(r_vec);
    v = norm(v_vec);
    
    % Compute specific angular momentum
    h_vec = cross(r_vec, v_vec);
    h = norm(h_vec);
    
    % Compute node vector
    k_hat = [0; 0; 1];
    n_vec = cross(k_hat, h_vec);
    n = norm(n_vec);
    
    % Compute eccentricity vector and magnitude
    e_vec = (1 / MU) * ((v^2 - MU / r) * r_vec - dot(r_vec, v_vec) * v_vec);
    e = norm(e_vec);
    
    % Compute specific mechanical energy and semi-major axis
    energy = (v^2 / 2) - (MU / r);
    a = -MU / (2 * energy);
    
    % Compute inclination
    i = acos(max(-1, min(1, h_vec(3) / h)));
    
    % Define a small tolerance to check for circular/equatorial orbits
    tol = 1e-10; 
    
    % Compute right ascension of the ascending node (RAAN)
    if n < tol
        W = 0; % Equatorial orbit
    else
        W = acos(max(-1, min(1, n_vec(1) / n)));
        if n_vec(2) < 0
            W = 2 * pi - W;
        end
    end
    
    % Compute argument of periapsis and true anomaly
    if e < tol
        w = 0; % Circular orbit
        if n < tol
            % Circular equatorial
            ta = acos(max(-1, min(1, r_vec(1) / r)));
            if r_vec(2) < 0
                ta = 2 * pi - ta;
            end
        else
            % Circular inclined
            ta = acos(max(-1, min(1, dot(n_vec, r_vec) / (n * r))));
            if r_vec(3) < 0
                ta = 2 * pi - ta;
            end
        end
    else
        % Elliptical orbit
        if n < tol
            % Equatorial elliptical
            w = acos(max(-1, min(1, e_vec(1) / e)));
            if e_vec(2) < 0
                w = 2 * pi - w;
            end
        else
            % Inclined elliptical (Normal case)
            w = acos(max(-1, min(1, dot(n_vec, e_vec) / (n * e))));
            if e_vec(3) < 0
                w = 2 * pi - w;
            end
        end
        
        % True anomaly for elliptical
        ta = acos(max(-1, min(1, dot(e_vec, r_vec) / (e * r))));
        if dot(r_vec, v_vec) < 0
            ta = 2 * pi - ta;
        end
    end
    
    % Assemble final Keplerian elements vector
    kep = [a; e; i; W; w; ta];
end