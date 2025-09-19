"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Eye,
  Code,
  Calendar,
  TrendingUp,
  ExternalLink,
  Star,
  Clock,
  Users,
  Zap,
  Activity,
} from "lucide-react";

interface StatusProp {
  status: "active" | "building" | "inactive";
}

type WebsiteStatus = "active" | "building" | "inactive";

interface HostedWebsite {
  id: number;
  name: string;
  url: string;
  status: WebsiteStatus;
  views: number;
  uptime: number; // percentage
  lastDeployed: string; // e.g., "2 hours ago"
  tech: string[]; // e.g., ["React", "Node.js"]
  visitors: number; // monthly visitors
  performance: number; // performance score out of 100
  thumbnail: string; // image URL
}

const PortfolioOverview = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Mock data for hosted websites
  const hostedWebsites: HostedWebsite[] = [
    {
      id: 1,
      name: "E-Commerce Platform",
      url: "https://shop.example.com",
      status: "active",
      views: 15420,
      uptime: 99.9,
      lastDeployed: "2 hours ago",
      tech: ["React", "Node.js", "MongoDB"],
      visitors: 1250,
      performance: 94,
      thumbnail:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Portfolio Website",
      url: "https://portfolio.example.com",
      status: "active",
      views: 8930,
      uptime: 100,
      lastDeployed: "1 day ago",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      visitors: 640,
      performance: 98,
      thumbnail:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Blog Platform",
      url: "https://blog.example.com",
      status: "building",
      views: 12300,
      uptime: 98.5,
      lastDeployed: "3 days ago",
      tech: ["Gatsby", "GraphQL", "Strapi"],
      visitors: 890,
      performance: 91,
      thumbnail:
        "https://images.unsplash.com/photo-1486312338219-ce68e2c6b0d3?w=400&h=300&fit=crop",
    },
  ];

  const stats = {
    totalProjects: hostedWebsites.length,
    totalViews: hostedWebsites.reduce((sum, site) => sum + site.views, 0),
    avgUptime:
      hostedWebsites.reduce((sum, site) => sum + site.uptime, 0) /
      hostedWebsites.length,
    activeProjects: hostedWebsites.filter((site) => site.status === "active")
      .length,
  };

  const StatusBadge = ({ status }: StatusProp) => {
    const statusConfig = {
      active: {
        bg: "bg-green-100",
        text: "text-green-800",
        dot: "bg-green-400",
      },
      building: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        dot: "bg-yellow-400",
      },
      inactive: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-400" },
    };

    const config = statusConfig[status];

    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full mr-1 ${config.dot} animate-pulse`}
        ></div>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Floating orbs for visual appeal */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Portfolio Overview
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Manage and monitor your hosted websites with real-time analytics and
            performance metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Projects",
              value: stats.totalProjects,
              icon: Globe,
              color: "blue",
            },
            {
              label: "Views",
              value: stats.totalViews.toLocaleString(),
              icon: Eye,
              color: "indigo",
            },
            {
              label: "Uptime",
              value: `${stats.avgUptime.toFixed(1)}%`,
              icon: TrendingUp,
              color: "green",
            },
            {
              label: "Active",
              value: stats.activeProjects,
              icon: Activity,
              color: "cyan",
            },
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-3 shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300 ${
                      stat.color === "blue"
                        ? "bg-blue-500"
                        : stat.color === "indigo"
                        ? "bg-indigo-500"
                        : stat.color === "green"
                        ? "bg-green-500"
                        : "bg-cyan-500"
                    }`}
                  >
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-xs font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl p-2 mb-4 border-2 border-gray-100 shadow-lg">
          <div className="flex space-x-2">
            {["overview", "analytics", "performance"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 capitalize text-sm ${
                  activeTab === tab
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {hostedWebsites.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Main Project Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 hover:border-blue-200">
                {/* Project Image */}
                <div className="relative h-32 overflow-hidden bg-gray-100">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>

                  {/* Floating action buttons */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="p-1.5 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 border border-gray-200">
                      <ExternalLink className="w-3 h-3 text-gray-700" />
                    </button>
                    <button className="p-1.5 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors duration-200 border border-gray-200">
                      <Eye className="w-3 h-3 text-gray-700" />
                    </button>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-2 left-2">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-medium ml-1">4.9</span>
                    </div>
                  </div>

                  <p className="text-blue-600 text-xs font-medium mb-2 hover:underline cursor-pointer truncate">
                    {project.url}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-sm font-bold text-blue-600">
                        {(project.views / 1000).toFixed(1)}k
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        Views
                      </div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-sm font-bold text-green-600">
                        {project.uptime}%
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        Uptime
                      </div>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tech.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {project.lastDeployed}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {project.visitors}
                    </div>
                  </div>
                </div>

                {/* Hover overlay with detailed stats */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-white rounded-2xl p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-blue-200">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">
                      Performance Metrics
                    </h4>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                          Performance Score
                        </span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div
                              className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
                              style={{ width: `${project.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-green-600">
                            {project.performance}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">
                          Monthly Visitors
                        </span>
                        <span className="text-xs font-bold">
                          {project.visitors}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Load Time</span>
                        <span className="text-xs font-bold text-blue-600">
                          1.2s
                        </span>
                      </div>
                    </div>

                    <button className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                      View Analytics
                    </button>
                  </div>
                )}
              </div>

              {/* Floating performance indicator */}
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                {project.performance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
