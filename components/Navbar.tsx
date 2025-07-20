import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      {/** Left Side */}
      <SidebarTrigger />

      {/** Right Side */}
    </nav>
  );
};

export default Navbar;
