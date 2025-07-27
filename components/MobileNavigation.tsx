"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menuItems } from "@/constants";
import { LucideIcon, Menu, Network, User } from "lucide-react";
import { useState } from "react";

interface Prop {
  fullName: string;
  email: string;
}

type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: null;
};

const MobileNavigation = ({ fullName, email }: Prop) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

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

    return (
      <div
        onClick={() => onClick(item.id)}
        className={`
          group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl cursor-pointer transition-all duration-300 ease-out
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 shadow-lg shadow-blue-500/25"
              : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:text-gray-900"
          }
          ${isCollapsed ? "justify-center" : ""}
        `}
      >
        <div
          className={`
          flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300
          ${
            isActive
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
              {item.label}
            </span>
            {item.badge && (
              <span
                className={`
                px-2 py-0.5 text-xs font-semibold rounded-full
                ${
                  isActive
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
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
        )}
      </div>
    );
  };

  return (
    <div className="min-sm:hidden ">
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

              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  onClick={setActiveItem}
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
                      {fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{email}</p>
                  </div>
                  <div className="flex gap-1"></div>
                </div>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
