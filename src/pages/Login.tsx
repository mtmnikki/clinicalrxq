/**
 * Login page component
 * Handles member authentication for accessing training programs
 */
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  const handleLoginSuccess = (token: string) => {
    console.log('Login successful, token:', token);
    // Additional success handling if needed
  };

  return (
    <LoginForm 
      onLoginSuccess={handleLoginSuccess}
      redirectTo="/training"
    />
  );
}