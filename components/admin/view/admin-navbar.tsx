"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminSidebar from "./admin-sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Mail, Menu, MessageCircle, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@/components/admin/view/user-button";

export const AdminNavbar = () => {

  return (
    <TooltipProvider>
      <nav className="flex items-center justify-between w-full p-4 bg-white shadow-lg dark:bg-slate-900 rounded-xl">
        <div className="flex items-center justify-center gap-x-2">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-slate-500" />
            </SheetTrigger>
            <SheetContent className="w-64" side="left">
              <AdminSidebar sheetClose={true} />
            </SheetContent>
          </Sheet>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Dark Mode
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Search className="w-5 h-5 text-slate-500" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MessageCircle className="w-5 h-5 text-slate-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-60" align="end">
              <div className="flex flex-col gap-2 p-2 bg-white border rounded-md shadow-md dark:bg-slate-800 border-slate-400 dark:border-slate-100">
                <div>Tes</div>
                <div>Tes</div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className="w-5 h-5 text-slate-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-72" align="end">
              <div className="flex flex-col justify-center p-2 bg-white border divide-y-2 rounded-md shadow-md divide-y-slate-400 dark:divide-y-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-100">
                <div className="py-2 text-sm text-center text-slate-600">15 Notifications</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 py-2">
                    <Mail />
                    <span>4 new messages</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    3 mins
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Mail />
                    <span>8 friend requests</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    12 hours
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Mail />
                    <span>3 new reports</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    12 hours
                  </div>
                </div>
                <div className="py-2 text-sm text-center">
                  See All Notifications
                </div>
              </div> 
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </nav>
    </TooltipProvider>
  );
};
