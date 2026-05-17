function ma = ta2ma(e, ta)
    arguments (Input)
        e  (1,1) double     % eccentricity
        ta (1,1) double     % true anomaly
    end
    
    arguments (Output)
        ma (1,1) double    % mean anomaly
    end
    
    % Compute sine and cosine of the Eccentric Anomaly (E)
    sin_E = (sqrt(1 - e^2) * sin(ta)) / (1 + e * cos(ta));
    cos_E = (e + cos(ta)) / (1 + e * cos(ta));
    
    % Resolve quadrant ambiguity for Eccentric Anomaly
    E = atan2(sin_E, cos_E);
    
    % Calculate Mean Anomaly using Kepler's Equation
    ma = E - e * sin(E);
end