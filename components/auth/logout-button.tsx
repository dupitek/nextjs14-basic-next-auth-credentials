'use client'

import { logoutUser } from '@/actions/auths';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

interface LogoutButtonProps {
    children?: React.ReactNode;
  };

export default function LogoutButton({
    children
}: LogoutButtonProps) {
    const router = useRouter()
    const logout = async () => {
        await logoutUser()
        toast.success("Success Logout")
        router.push('/login')
    }

    return (
      <button onClick={logout} role='menubar' className="cursor-pointer">
        {children}
      </button>
    );
}
