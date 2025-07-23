import { signOutUser } from "@/lib/actions/user.action";
import MobileNavigation from "./MobileNavigation";

interface Prop {
  fullName: string;
  email: string;
}

const Navbar = ({ fullName, email }: Prop) => {
  return (
    <nav className="flex items-end justify-end p-4">
      {/** Right Side */}
      <div>
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <MobileNavigation fullName={fullName} email={email} />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
