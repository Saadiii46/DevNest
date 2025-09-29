"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileMenuItems } from "@/constants";
import { signOutUser } from "@/lib/actions/user.action";
import { handleClientError } from "@/lib/handleClientError";
import { LucideIcon, Menu, Network, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: null;
};

const MobileNavigation = () => {
  const [isCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsloading(true);
    try {
      await signOutUser();
      router.push("/sign-in");
    } catch (error) {
      const { message } = handleClientError(error);
      toast.error(message);
    } finally {
      setIsloading(false);
    }
  };

  const handleItemClick = (itemId: string) => {
    if (itemId === "logout") {
      handleLogout();
    } else {
      setActiveItem(itemId);
    }
  };

  const MenuItem = ({
    item,
    isActive,
    onClick,
  }: {
    item: SidebarItem;
    isActive: boolean;
    onClick: (id: string) => void;
  }) => {
    const Icon = item.icon;
    const isLogout = item.id === "logout";

    return (
      <div
        onClick={() => onClick(item.id)}
        className={`
          group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl cursor-pointer transition-all duration-300 ease-out
          ${
            isLogout
              ? isActive
                ? "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-600 shadow-lg shadow-red-500/25"
                : "text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700"
              : isActive
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 shadow-lg shadow-blue-500/25"
              : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900"
          }
          ${isCollapsed ? "justify-center" : ""}
          ${isLoading && isLogout ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <div
          className={`
          flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300
          ${
            isLogout
              ? isActive
                ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg"
                : "text-red-500 group-hover:text-red-700 group-hover:bg-red-50"
              : isActive
              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
              : "text-gray-500 group-hover:text-gray-700"
          }
        `}
        >
          <Icon size={18} />
        </div>

        {!isCollapsed && (
          <>
            <span className="font-medium text-sm flex-1 truncate">
              {isLoading && isLogout ? "Logging out..." : item.label}
            </span>
            {item.badge && (
              <span
                className={`
                px-2 py-0.5 text-xs font-semibold rounded-full
                ${
                  isLogout
                    ? isActive
                      ? "bg-red-100 text-red-700"
                      : "bg-red-100 text-red-600 group-hover:bg-red-200"
                    : isActive
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                } 
              `}
              >
                {item.badge}
              </span>
            )}
          </>
        )}

        {isActive && (
          <div
            className={`
              absolute inset-0 rounded-xl animate-pulse
              ${
                isLogout
                  ? "bg-gradient-to-r from-red-500/10 to-red-600/10"
                  : "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              }
            `}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="min-md:hidden mt-4 mr-4">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center justify-between p-4 border-b border-gray-200/60">
                  {!isCollapsed && (
                    <div className="flex items-center gap-3">
                      <div className="network-icon">
                        <Network size={20} className="text-white" />
                      </div>
                      <div>
                        <h1 className="font-bold text-gray-900 text-lg">
                          DevNest
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              </SheetTitle>
              <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {!isCollapsed && (
                  <div className="px-3 mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Main Menu
                    </h3>
                  </div>
                )}

                {MobileMenuItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={handleItemClick}
                  />
                ))}
              </nav>
            </SheetHeader>

            <SheetFooter>
              <div className="p-4 border-t border-gray-200/60">
                {isCollapsed ? (
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="user-icon">
                      <User size={18} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {/* {fullName} */}
                      </p>
                      {/* <p className="text-xs text-gray-500 truncate">{email}</p> */}
                    </div>
                    <div className="flex gap-1"></div>
                  </div>
                )}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileNavigation;
