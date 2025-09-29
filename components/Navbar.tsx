import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className="flex items-end justify-end">
      {/** Right Side */}

      <MobileNavigation />
    </nav>
  );
};

export default Navbar;
