import { Link } from "react-router-dom";
import UserNavItems from "../features/user/UserNavItems";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const Header = () => {


  // const currentUserId = localStorage.getItem("userId");
  // const displayName = localStorage.getItem("name");


  const {currentUser, displayName} = useAuth();

  const userIdCheck = localStorage.getItem("userId");
  // const userName = localStorage.getItem("userName");
  return (
    <nav className="px-5 navbar bg-base-300">
      <div className="flex-1">
        <Logo />
      </div>

      {currentUser && userIdCheck ? (
        <UserNavItems />
      ) : (
        <div className="space-x-3 navbar-end">
          <Link to="/login" className="btn btn-neutral">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
