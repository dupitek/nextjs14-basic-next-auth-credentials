"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import LogoutButton from "@/components/auth/logout-button";
import { useSession } from "next-auth/react";

export const UserButton = () => {
  const {data} = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={data?.user?.image ?? ""} />
          <AvatarFallback className="bg-sky-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/admin/profile" className="flex items-center gap-2">
            <User />
            <span> Profile</span>
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
