function [C,S] = stumpff(z,eps)
    arguments (Input)
        z   (1,1) double    % function input
        eps (1,1) double    % tolerance for Stumpff functions near 0
    end

    arguments (Output)
        C (1,1) double      % Stumpff function C evaluated at z
        S (1,1) double      % Stumpff function S evaluated at z
    end
    
    % Evaluate Stumpff functions based on the value of z
    if z > eps
        % Trigonometric formulation for positive z (elliptical)
        sqrt_z = sqrt(z);
        C = (1 - cos(sqrt_z)) / z;
        S = (sqrt_z - sin(sqrt_z)) / (sqrt_z)^3;
    elseif z < -eps
        % Hyperbolic formulation for negative z (hyperbolic)
        sqrt_neg_z = sqrt(-z);
        C = (cosh(sqrt_neg_z) - 1) / (-z);
        S = (sinh(sqrt_neg_z) - sqrt_neg_z) / (sqrt_neg_z)^3;
    else
        % Taylor series expansion for z near zero (parabolic)
        C = 1/2 - z/24 + z^2/720;
        S = 1/6 - z/120 + z^2/5040;
    end
end