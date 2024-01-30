import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../features/user/GoogleButton";
import useMoveToHome from "../hooks/useMoveToHome";
import Alert from "../ui/Alert";
import { errorMessages } from "../utils/helperFuntions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithEmailAndPwd, loginWithGoogle, setCurrentUser, setUserName } = useAuth();
  const moveToHome = useMoveToHome();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = userCredentials;
  
    // for validation
    if (!email || !password) {
      setError(errorMessages.emptyFields);
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await axios.post(' https://good-gray-yak-tux.cyclic.app/login', {
        email,
        password,
      });
  
      console.log(response);
  
      if (response.status === 200) {
        const userId = response.data._id;
        const userName = response.data.name;
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", userName);
  
        await loginWithEmailAndPwd(email, password);
        setCurrentUser(userName);
        // moveToHome();
        navigate({
          pathname : `/profile/${userId}`,
        })
      } else {
        setError(errorMessages.loginFailed);
      }
    } catch (error) {
      console.error(error);
      setError(errorMessages.loginFailed);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle(userCredentials);
      moveToHome();
    } catch (error) {
      setError(errorMessages.googleAuthFailed);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md px-5 py-10 mx-auto my-10 space-y-3 text-center border rounded-lg shadow-sm border-base-200">
      <form onSubmit={handleSubmit} className="space-y-3 ">
        <h2 className="text-3xl font-bold text-primary">Login</h2>
        {/* Email Address Input */}

        {error && <Alert type={"error"} message={error} />}

        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">
              Email Address
            </span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="e.g. mail@gmail.com"
            className="w-full input input-bordered"
            value={userCredentials.email}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        {/* Password Input */}
        <label className="w-full form-control">
          <div className="label">
            <span className="text-lg font-semibold label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="e.g. 123456"
            className="w-full input input-bordered"
            value={userCredentials.password}
            onChange={handleChange}
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
          {loading && <span className="loading loading-spinner"></span>}
        </button>
      </form>

      <div className="divider"></div>

      {/* <GoogleButton handleGoogleLogin={handleGoogleLogin} disabled={loading} /> */}
<div  className="pt-2 pb-2 mt-4 text-sm bg-red-200 rounded-full text-neutral">
  <h2 className="text-[1.8rem] text-red-600 mb-4">view credentials</h2>
  <p className="text-[1.2rem] text-pink-900 mb-4">mail id:  chris@gmail.com</p>
  <p className="text-[1.2rem] text-pink-900 mb-4" >pw:  captainamerica</p>
</div>


      <div className="mt-4 text-m text-neutral">
        Don&apos;t have an account?
        <Link to="/register" className="ml-1 text-primary hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
