function rvf = propagate_elliptical(rv, tof, MU)
    arguments (Input)
        rv  (6,1) double     % initial cartesian vector
        tof (1,1) double     % time of flight
        MU  (1,1) double     % gravitational parameter
    end
    
    arguments (Output)
        rvf (6,1) double        % final position & velocity vector [rf; vf]
    end
    
    % Convert initial Cartesian state to Keplerian elements
    kep0 = rv2kep(rv, MU);
    
    % Extract necessary elements
    a = kep0(1);
    e = kep0(2);
    ta0 = kep0(6);
    
    assert(e < 1)
    
    % Calculate the orbital period
    period = 2 * pi * sqrt(a^3 / MU);
    
    % Propagate the true anomaly
    ta_f = propagate_elliptical_ta(period, e, ta0, tof);
    
    % Update the Keplerian elements vector with the new true anomaly
    kep_f = kep0;
    kep_f(6) = ta_f;
    
    % Convert the updated Keplerian elements back to Cartesian state
    rvf = kep2rv(kep_f, MU);
end