import { LogOut } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { signOutUser } from "@/lib/actions/user.action";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      {/** Left Side */}
      <SidebarTrigger />

      {/** Right Side */}
      <div>
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button type="submit" variant="signOut">
            <LogOut className="" />
          </Button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
