import { auth } from "@/auth";
import { Role } from "@prisma/client";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const allowedRole = (role: Role, userRole: Role) => {
  if(role === userRole) {
    return true
  }
  return false
};

export const isAdmin = async () => {
    const session = await auth();

    return session?.user.role === Role.SUPERADMIN
};

export const isMarketing = async () => {
    const session = await auth();

    if (session?.user.role === Role.MARKETING) {
        return true
    }

    return false
};

export const isWriter = async () => {
    const session = await auth();

    if (session?.user.role === Role.WRITER) {
        return true
    }

    return false
};