import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import { Link } from "react-router-dom";
import Alert from "../ui/Alert";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const { user, updateUserInfo } = useAuth();

  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    address: user ? user.address : "",
    city: user ? user.city : "",
    state: user ? user.state : "",
    phnumber: user ? user.phnumber : "",
    profilePhoto: user ? user.profilePhoto : "",
  });

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(` https://good-gray-yak-tux.cyclic.app/api/v1/credentials/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userCredentials.name,
          email: userCredentials.email,
          address: userCredentials.address,
          city: userCredentials.city,
          state: userCredentials.state,
          phnumber: userCredentials.phnumber,
          profilePhoto: userCredentials.profilePhoto,
        }),
      });

      if (!response.ok) {
        throw new Error(`Non-JSON response: ${response.statusText}`);
      }
      const updatedUser = await response.json();
      updateUserInfo(updatedUser);
      navigate(`/profile/${user._id}`);
      console.log("User updated successfully");
    } catch (error) {
      setError(`Error updating user details: ${error.message}`);
      console.error("Error updating user details:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    setUserCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-w-md px-5 py-10 mx-auto my-10 space-y-3 text-center border rounded-lg shadow-sm border-base-200 text-primary">
      <form onSubmit={handleUpdateSubmit} className="space-y-3">
        <h2 className="text-3xl font-bold text-primary">Update Profile</h2>

        {error && <Alert type={"error"} message={error} />}

        <div className="flex gap-6">
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">Name</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full input input-bordered"
            value={userCredentials.name}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">
              Email Address
            </span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            className="w-full input input-bordered"
            value={userCredentials.email}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        </div>

        <div className="flex gap-6">
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">Address</span>
          </div>
          <input
            type="text"
            name="address"
            placeholder="Enter your Address"
            className="w-full input input-bordered"
            value={userCredentials.address}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <label htmlFor="city" className="w-full form-control">
        <div className="label">
            <span className="text-lg font-semibold label-text">City</span>
          </div>
          <select id="city" value={userCredentials.city}
            onChange={handleChange}
            disabled={loading} className="w-full input input-bordered" required="" name="city"><option value="" disabled="">Select a city</option><option value="Chennai">Chennai</option><option value="Coimbatore">Coimbatore</option><option value="Trichy">Trichy</option><option value="Tirunelveli">Tirunelveli</option><option value="Kanyakumari">Kanyakumari</option></select>
        </label>
        
        </div>

        <div className="flex gap-6">
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">State</span>
          </div>
          <input
            type="text"
            name="state"
            placeholder="Enter your state"
            className="w-full input input-bordered"
            value={userCredentials.state}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">
              Phone Number
            </span>
          </div>
          <input
            type="text"
            name="phnumber"
            placeholder="Enter your phone number"
            className="w-full input input-bordered"
            value={userCredentials.phnumber}
            onChange={handleChange}
            disabled={loading}
          />
        </label>
        </div>
        <div className="flex items-center justify-center gap-[2rem] mt-6 mb-6">
          <label
            htmlFor="profileImage"
            className="text-lg font-semibold label-text w-[12rem]"
          >
            Profile Image
          </label>

          <FileBase64
            type="file"
            name="profileImage"
            id="profileImage"
            className="w-full input input-bordered "
            onDone={({ base64 }) => {
              handleChange({
                target: {
                  name: "profilePhoto",
                  value: base64,
                },
              });
            }}
          />
        </div>


        <button
          type="submit"
          className="btn btn-primary btn-block "
          disabled={loading}
        >
          Update
          {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>


      
    </div>
  );
};

export default ProfileUpdate;
