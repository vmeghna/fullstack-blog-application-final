import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../MongoDB/request";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const {user, setUser} = useAuth();

  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(id);
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [id]);

  const navigate = useNavigate();
  const handleUpdateProfileClick = () => {
    navigate({
      pathname: `/profileUpdate/${id}`,
      state: { user },
    });
  };


  
  return (
    <div  className="flex flex-col min-h-screen pt-6 pb-6 pl-[36rem] ">
      <h2 className="text-[2rem] font-bold text-red-600 underline "> User Profile</h2>
      {user && (
  <div>
    <p className="text-[1.6rem] text-semibold text-orange-600 pb-2">Name: {user.name}</p>
    <p className="text-[1.6rem] text-semibold text-orange-600 pb-2">Email: {user.email}</p>
    <p className="text-[1.6rem] text-semibold text-orange-600 pb-2">Address : {user.address}</p>
    <p className="text-[1.6rem] text-semibold text-orange-600 pb-2">City : {user.city}</p>
    <p className="text-[1.6rem] text-semibold text-orange-600 pb-2">State : {user.state}</p>
    <p className="text-[1.6rem] text-semibold text-orange-600 pb-2">Phone Number : {user.phnumber}</p>
    <div  className="flex w-[10rem] outline-double">
      <img src={user.profilePhoto} alt="" />
    </div>
    <div className="mt-8">
      {/* <Link to={`/profileUpdate/${id}`} className="btn btn-primary">Update Profile</Link> */}
      <button onClick={handleUpdateProfileClick} className="btn btn-primary">Update Profile</button>
    </div>
  </div>
)}
    </div>
  );
};

export default Profile;

