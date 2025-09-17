"use client";
import EmptyState from "@/components/uploads/EmptyState";
import HostingModal from "@/components/uploads/HostingModal";
import ProjectCard from "@/components/uploads/ProjectCard";
import Notification from "@/components/uploads/Notification";
import React, { useState, useEffect } from "react";

// Type definitions
interface Project {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "ready" | "hosted" | "processing";
  files: number;
  icon: string;
}

const UploadsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "E-Commerce Dashboard",
      type: "React App",
      size: "2.4 MB",
      uploadDate: "2 hours ago",
      status: "ready",
      files: 45,
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
    {
      id: 2,
      name: "Portfolio Website",
      type: "HTML/CSS",
      size: "1.8 MB",
      uploadDate: "1 day ago",
      status: "hosted",
      files: 23,
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      id: 3,
      name: "Task Manager App",
      type: "Vue.js",
      size: "3.1 MB",
      uploadDate: "3 days ago",
      status: "ready",
      files: 67,
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      id: 4,
      name: "Blog Platform",
      type: "Next.js",
      size: "4.2 MB",
      uploadDate: "5 days ago",
      status: "processing",
      files: 89,
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    },
    {
      id: 5,
      name: "Weather App",
      type: "Angular",
      size: "1.6 MB",
      uploadDate: "1 week ago",
      status: "ready",
      files: 34,
      icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    },
    {
      id: 6,
      name: "Social Media Clone",
      type: "React Native",
      size: "5.7 MB",
      uploadDate: "2 weeks ago",
      status: "hosted",
      files: 123,
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3h5a3 3 0 013 3v2a3 3 0 01-3 3z",
    },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string): void => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const openHostingModal = (project: Project): void => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeHostingModal = (): void => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const hostProject = (): void => {
    if (!selectedProject) return;

    const updatedProjects = projects.map((p) =>
      p.id === selectedProject.id ? { ...p, status: "processing" as const } : p
    );
    setProjects(updatedProjects);
    closeHostingModal();

    // Simulate hosting process
    setTimeout(() => {
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === selectedProject.id ? { ...p, status: "hosted" as const } : p
        )
      );
      showNotification(`${selectedProject.name} is now live!`);
    }, 3000);
  };

  const viewProject = (project: Project): void => {
    showNotification(`Opening ${project.name}...`);
  };

  const manageProject = (project: Project): void => {
    showNotification(`Managing ${project.name}...`);
  };

  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && showModal) {
        closeHostingModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Uploaded Projects
                </h1>
                <p className="text-gray-600">Manage and deploy your projects</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              {projects.length} Projects
            </div>
          </div>
          <div className="w-full h-px bg-gray-200"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onHostProject={openHostingModal}
                onViewProject={viewProject}
                onManageProject={manageProject}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal and Notification */}
      <HostingModal
        isOpen={showModal}
        project={selectedProject}
        onClose={closeHostingModal}
        onConfirm={hostProject}
      />
      <Notification message={notification} />
    </div>
  );
};

export default UploadsSection;
