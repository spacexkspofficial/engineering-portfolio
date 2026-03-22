function ta = propagate_elliptical_ta(period, e, ta0, tof)
    arguments (Input)
        period (1,1) double    % period
        e      (1,1) double    % eccentricity
        ta0    (1,1) double    % initial true anomaly
        tof    (1,1) double    % time of flight
    end
    
    arguments (Output)
        ta (1,1) double        % true anomaly after tof
    end
    
    assert(e < 1)
    
    % Convert initial true anomaly to initial mean anomaly
    ma0 = ta2ma(e, ta0);
    
    % Calculate mean motion
    n = 2 * pi / period;
    
    % Propagate mean anomaly forward by the time of flight
    ma_f = ma0 + n * tof;
    
    % Convert final mean anomaly back to true anomaly
    ta = ma2ta(e, ma_f);
end