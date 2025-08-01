import MobileNavigation from "./MobileNavigation";

interface Prop {
  fullName: string;
  email: string;
}

const Navbar = ({ fullName, email }: Prop) => {
  return (
    <nav className="flex items-end justify-end">
      {/** Right Side */}

      <MobileNavigation fullName={fullName} email={email} />
    </nav>
  );
};

export default Navbar;
