import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useMoveToHome from "../../hooks/useMoveToHome";
import Avatar from "../../ui/Avatar";
import { useState } from "react";
const UserNavItems = () => {

  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const {
    // currentUser: { displayName },
    currentUser,
    displayName,
    logout,
    setCurrentUser,
    setUserName,
  } = useAuth();

  const moveHome = useMoveToHome();

  const handleLogout = () => {
    // logout();
   
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      setUserName("");
    setCurrentUser("");
   
    moveHome();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    navigate(`/profile/${id}`);
  };

  

  return (
    <div className="flex-none gap-2">
     <Link to="/users/create-blog" className="btn btn-ghost">
     <i className="fa-solid fa-pen-nib"></i>
     Write
  </Link>
      <div className={`dropdown dropdown-end ${isDropdownOpen ? 'open' : ''}`}>
        <button onClick={handleDropdownToggle} className="btn btn-circle btn-ghost dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <Avatar name={currentUser} />
        </button>
        <ul tabIndex={0}
  className={`dropdown-menu menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box border border-base-200 bg-base-100 p-2 shadow-xl ${isDropdownOpen ? 'block' : 'hidden'}`}
  >
    <li className="mb-3 border-b menu-title border-base-300 text-base-content">{currentUser}</li>
    <li>
      <Link to={`/profile/${id}`} className="dropdown-item" onClick={handleDropdownItemClick}>Profile</Link>
      </li>
    <li><Link onClick={handleDropdownItemClick} to="/"className="dropdown-item">Blogs</Link></li>
    <li><button onClick={handleLogout}>Logout</button></li>
  </ul>
      </div>
    </div>
  );
};

export default UserNavItems;
