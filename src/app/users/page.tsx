'use client'
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import UsersDataTable from "./_components/users-datatable";
import { AuthGuard } from "@/components/auth-guard";

interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  data: {
    [key: string]: User;
  };
}

export default function Users() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!session?.user.access_token) {
      setError("No access token available");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('https://dev.mundodream.com.br/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: ApiResponse = await res.json();
      const usersArray = Object.values(data.data);
      setUsers(usersArray);
      console.log('usersArray', usersArray);
    } catch (error) {
      setError("Failed to fetch users");
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AuthGuard>
      <div className="p-10 pt-20">
       
      </div>
    </AuthGuard>
  );
}