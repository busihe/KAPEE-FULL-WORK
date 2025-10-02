import { useState } from 'react';
import { requestPasswordReset, resetPassword } from '../utils/passwordAPI';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePasswordResetRequest = async () => {
    if (!email) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await requestPasswordReset(email);

      if (response.status === 200) {
        setIsOtpSent(true);
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !email) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await resetPassword(otp, newPassword, email);

      if (response.status === 200) {
        setIsPasswordReset(true);
        setIsOtpSent(false);
      } else {
        setErrorMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setErrorMessage('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/Login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Password Reset</h2>

        {/* OTP Request */}
        {!isOtpSent && !isPasswordReset && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-center">Enter your email to receive OTP</h3>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              onClick={handlePasswordResetRequest}
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        )}

        {/* OTP & New Password */}
        {isOtpSent && !isPasswordReset && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-center">Enter OTP and your new password</h3>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </div>
        )}

        {/* Error */}
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        {/* OTP Sent */}
        {isOtpSent && !errorMessage && !isPasswordReset && (
          <p className="text-green-500 text-center mt-4">
            OTP sent successfully. Please check your email.
          </p>
        )}

        {/* Password Reset Success */}
        {isPasswordReset && (
          <div className="text-center mt-6">
            <h3 className="text-lg font-medium text-green-600">Password reset successful!</h3>
            <p className="text-sm text-gray-600">
              Your password has been changed. You can now log in.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
