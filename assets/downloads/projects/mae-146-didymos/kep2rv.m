function rv = kep2rv(kep, MU)
    arguments (Input)
        kep (6,1) double     % Keplerian elements vector
        MU  (1,1) double     % gravitational parameter
    end
    
    arguments (Output)
        rv (6,1) double    % return 6-by-1 state vector
    end
    
    % Extract Keplerian elements
    a  = kep(1);
    e  = kep(2);
    i  = kep(3);
    W  = kep(4);
    w  = kep(5);
    ta = kep(6);
    
    % Compute semi-latus rectum
    p = a * (1 - e^2);
    
    % Compute position vector in perifocal frame
    r_mag = p / (1 + e * cos(ta));
    r_pqw = r_mag * [cos(ta); sin(ta); 0];
    
    % Compute velocity vector in perifocal frame
    v_pqw = sqrt(MU / p) * [-sin(ta); e + cos(ta); 0];
    
    % Define rotation matrices for 3-1-3 sequence
    R3_W = [cos(W), -sin(W), 0; sin(W), cos(W), 0; 0, 0, 1];
    R1_i = [1, 0, 0; 0, cos(i), -sin(i); 0, sin(i), cos(i)];
    R3_w = [cos(w), -sin(w), 0; sin(w), cos(w), 0; 0, 0, 1];
    
    % Transformation matrix from perifocal to inertial frame
    Q_pX = R3_W * R1_i * R3_w;
    
    % Transform position and velocity to inertial frame
    r_vec = Q_pX * r_pqw;
    v_vec = Q_pX * v_pqw;
    
    % Assemble final state vector
    rv = [r_vec; v_vec];
end