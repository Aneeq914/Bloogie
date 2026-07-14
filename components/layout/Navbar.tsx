import LogOut from "../auth/LogOut";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div>
      <LogOut isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Navbar;
