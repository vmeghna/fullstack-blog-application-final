
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const Avatar = () => {
  const { user,currentUser } = useAuth();
  const storedAvatarTitle = localStorage.getItem("avatarTitle");

  const avatarTitle =
    typeof storedAvatarTitle === "string"
      ? storedAvatarTitle
      : typeof currentUser === "string"
      ? currentUser
          .split(" ")
          .map((item) => item.charAt(0))
          .join("")
          .toUpperCase()
      : "";

  return (
    <div className="avatar placeholder">
      <div className=" w-12 rounded-full bg-primary text-primary-content">
        {/* <span className="text-black"></span> */}
        {user && currentUser ? (
        <img src={user.profilePhoto} alt=""/>
        ) : ("")}
       
      </div>
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
};

export default Avatar;
