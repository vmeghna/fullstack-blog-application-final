import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../features/user/GoogleButton";
// import useMoveToHome from "../hooks/useMoveToHome";
import Alert from "../ui/Alert";
import { errorMessages } from "../utils/helperFuntions";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";

const Register = () => {
  const { signup, loginWithGoogle } = useAuth();

  // const moveToHome = useMoveToHome();

  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  city: "",
  state: "",
  phnumber: "",
  profilePhoto: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const { email, password, confirmPassword, name } = userCredentials;
    const { email, password, confirmPassword, name, address, city, state, phnumber, profilePhoto } = userCredentials;
  
  
    try {
      setLoading(true);
  
      await fetch('http://localhost:3001/api/v1/credentials/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          city,
          state,
          phnumber,
          profilePhoto,
        }),
      });
      // moveToHome();
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle(userCredentials);
      // moveToHome();
    } catch (error) {
      setError(errorMessages.googleAuthFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-5 py-10 mx-auto my-10 space-y-3 text-center border rounded-lg shadow-sm border-base-200 text-primary">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-3xl font-bold text-primary">Register</h2>

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

        {/* Email Address Input */}
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

        {/* Email Address Input */}
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

        
        

        {/* Password Input */}
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password should be at least 6 characters long."
            className="w-full input input-bordered"
            value={userCredentials.password}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        {/* Confirm Password Input */}
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">
              Confirm Password
            </span>
          </div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="w-full input input-bordered"
            value={userCredentials.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        {/* <div className="">
        <label for="profileImage" className="w-full form-control">Profile Image</label>
        <input type="file" className=""/>
        </div> */}
        <div className="flex items-center justify-center gap-8 mt-6 mb-6">
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
            className="w-full input input-bordered"
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
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Register
          {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>

      <div className="divider"></div>
      {/* <GoogleButton handleGoogleLogin={handleGoogleLogin} disabled={loading} /> */}

      <div className="mt-4 text-m text-neutral">
        Already have an account?
        <Link to="/login" className="ml-1 text-primary hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;

