import axios from 'axios';

// Request Password Reset (sending OTP)
export const requestPasswordReset = (email: string) => {
  return axios.post('http://localhost:5000/api/users/password-reset', { email });
};

// Reset Password using OTP, including email
export const resetPassword = (otp: string, newPassword: string, email: string) => {
  return axios.post('http://localhost:5000/api/users/reset-password', { otp, newPassword, email });
};
