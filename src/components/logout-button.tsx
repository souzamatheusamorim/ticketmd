"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { AUTH_CONFIG } from "@/lib/auth-config";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({ 
  variant = "outline", 
  size = "default", 
  className = "",
  children 
}: LogoutButtonProps) {
  const handleLogout = async () => {
    await signOut({ 
      callbackUrl: AUTH_CONFIG.LOGOUT_REDIRECT_URL,
      redirect: true 
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      {children || "Sair"}
    </Button>
  );
} 