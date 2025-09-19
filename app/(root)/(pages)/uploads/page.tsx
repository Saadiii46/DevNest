import EmptyState from "@/components/uploads/EmptyState";
// import HostingModal from "@/components/uploads/HostingModal";
import ProjectCard from "@/components/uploads/ProjectCard";
// import Notification from "@/components/uploads/Notification";
import React from "react";
import { getCurrentUser } from "@/lib/actions/user.action";
import { getUserFiles } from "@/lib/actions/file.action";
import Projects from "@/components/uploads/Projects";
// import { FileType } from "@/constants";

const UploadsSection = async () => {
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // const [notification, setNotification] = useState<string | null>(null);

  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("User not found");
  const userProjects = await getUserFiles({ ownerId: currentUser.$id });

  // const showNotification = (message: string): void => {
  //   setNotification(message);
  //   setTimeout(() => setNotification(null), 3000);
  // };

  // const openHostingModal = (project: FileType): void => {
  //   setShowModal(true);
  // };

  // const closeHostingModal = (): void => {
  //   setShowModal(false);
  //   setSelectedProject(null);
  // };

  // const hostProject = (): void => {
  //   if (!selectedProject) return;

  //   closeHostingModal();

  //   // Simulate hosting process
  //   setTimeout(() => {
  //     showNotification(`${selectedProject.name} is now live!`);
  //   }, 3000);
  // };

  // const viewProject = (project: FileType): void => {
  //   showNotification(`Opening ${project.name}...`);
  // };

  // const manageProject = (project: FileType): void => {
  //   showNotification(`Managing ${project.name}...`);
  // };

  // Handle escape key for modal
  // useEffect(() => {
  //   const handleEscape = (event: KeyboardEvent): void => {
  //     if (event.key === "Escape" && showModal) {
  //       closeHostingModal();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscape);
  //   return () => document.removeEventListener("keydown", handleEscape);
  // }, [showModal]);

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
              {userProjects.length} Projects
            </div>
          </div>
          <div className="w-full h-px bg-gray-200"></div>
        </div>

        {/* Projects Grid */}
        <div className="">
          {userProjects.length === 0 ? (
            <EmptyState />
          ) : (
            <Projects userProjects={userProjects} />
          )}
        </div>
      </div>

      {/* Modal and Notification */}
      {/* <HostingModal
        isOpen={showModal}
        project={selectedProject}
        onClose={closeHostingModal}
        onConfirm={hostProject}
      />
      <Notification message={notification} /> */}
    </div>
  );
};

export default UploadsSection;
