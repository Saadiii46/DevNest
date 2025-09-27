import MobileNavigation from "./MobileNavigation";

interface Prop {
  fullName: string;
  email: string;
}

const Navbar = ({ fullName, email }: Prop) => {
  return (
    <nav className="flex items-end justify-end">
      {/** Right Side */}

<h2>Bell Icon</h2>
      <MobileNavigation fullName={fullName} email={email} />
    </nav>
  );
};

export default Navbar;
