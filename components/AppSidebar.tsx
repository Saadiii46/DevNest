"use client";

import React, { useState } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Folder,
  Calendar,
  MessageSquare,
  Star,
  Plus,
} from "lucide-react";

export default function ModernSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
    { id: "analytics", icon: BarChart3, label: "Analytics", badge: "12" },
    { id: "projects", icon: Folder, label: "Projects", badge: null },
    { id: "calendar", icon: Calendar, label: "Calendar", badge: "3" },
    { id: "messages", icon: MessageSquare, label: "Messages", badge: "5" },
    { id: "team", icon: Users, label: "Team", badge: null },
    { id: "documents", icon: FileText, label: "Documents", badge: null },
    { id: "favorites", icon: Star, label: "Favorites", badge: null },
  ];

  const MenuItem = ({
    item,
    isActive,
    onClick,
  }: {
    item: any;
    isActive: any;
    onClick: any;
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
    <div className="flex h-screen bg-gray-50 sticky">
      {/* Sidebar */}
      <div
        className={`
        relative flex flex-col bg-white shadow-2xl transition-all duration-500 ease-in-out
        ${isCollapsed ? "w-20" : "w-72"}
        border-r border-gray-200/60
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/60">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Acme Corp</h1>
                <p className="text-xs text-gray-500">Dashboard v2.0</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight size={18} className="text-gray-600" />
            ) : (
              <ChevronLeft size={18} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
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

          {!isCollapsed && (
            <>
              <div className="px-3 mt-8 mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Workspace
                </h3>
              </div>

              <div className="mx-2 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Plus size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Upgrade Plan
                    </h4>
                    <p className="text-xs text-gray-600">Get more features</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                  Upgrade Now
                </button>
              </div>
            </>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200/60">
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">john@acme.com</p>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Bell size={16} className="text-gray-500" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <Settings size={16} className="text-gray-500" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <LogOut size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {/* <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, John!
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your projects today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analytics</h3>
                  <p className="text-sm text-gray-500">View insights</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                12,543
              </div>
              <div className="text-sm text-green-600 font-medium">
                +12% from last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Team Members</h3>
                  <p className="text-sm text-gray-500">Active users</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">847</div>
              <div className="text-sm text-blue-600 font-medium">
                +5 new this week
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Folder size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Projects</h3>
                  <p className="text-sm text-gray-500">In progress</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">23</div>
              <div className="text-sm text-purple-600 font-medium">
                3 due this week
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      New document created
                    </p>
                    <p className="text-sm text-gray-500">
                      Project Alpha - Requirements.pdf
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
