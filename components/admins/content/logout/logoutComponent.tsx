import { useEffect } from "react";
import { logoutAdmin } from "@/lib/api";

export const dynamic = 'force-dynamic';

interface LogoutComponentProps {
  onLogoutSuccess?: () => void;
}

export default function LogoutComponent({ onLogoutSuccess }: LogoutComponentProps) {

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      
      if (onLogoutSuccess) {
        onLogoutSuccess();
      } else {
        window.location.href = "/auth/login"; 
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="flex items-center justify-center h-64">
      <p>Logging out...</p>
    </div>
  );
}