import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  // const [user, setUser] = useState(null);
  const [user,setUser]=useState(JSON.parse (localStorage.getItem("user")) || null);
  let storedUserId;

 

  console.log(currentUser);

  useEffect(() => {
    storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("name");

    const checkAuthenticationStatus = async () => {
      if (storedUserId) {
        setCurrentUser(storedUserName);
        setUserName(storedUserName);
      }

      setLoading(false);
    };

    checkAuthenticationStatus();
  }, [setCurrentUser, setUserName]);

  

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(` https://good-gray-yak-tux.cyclic.app/userDetails?email=${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };
  

  const loginWithEmailAndPwd = async (email, password) => {
    try {
      const response = await axios.post(' https://good-gray-yak-tux.cyclic.app/login', { email, password });
      const { success, userDetails } = response.data;
  
      if (success) {
        const userId = userDetails._id;
        const userName = userDetails.name;
  
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", userName);

  
        const userDetailResponse = await fetchUserDetails(userId);
        setCurrentUser(userDetailResponse.name);
        const avatarTitle = userDetailResponse.name
          .split(" ")
          .map((item) => item.charAt(0))
          .join("")
          .toUpperCase();
  
        setUserName(userDetailResponse.name);
        localStorage.setItem("avatarTitle", avatarTitle);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  // const loginWithGoogle = async () => {
  //   await signInWithPopup(auth, googleProvider);
  //   const user = auth.currentUser;
  //   if (user && user.displayName) {
  //     setUserName(user.displayName);
  //     setCurrentUser(user.displayName);
  //     const uid = user.uid;
  //     localStorage.setItem("userId", user.uid);
  //     localStorage.setItem("name", user.displayName);
  //   }
  // };


  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;
  
      if (user && user.displayName) {
        setUserName(user.displayName);
        setCurrentUser(user.displayName);
  
        // Add this part to update the user's name in MongoDB
        const userId = user.uid;
         // await axios.post('http://localhost:3001/api/v1/credentials/', {
        //   userId,
        //   name: user.displayName,
        // });
        await fetch(' https://good-gray-yak-tux.cyclic.app/api/v1/credentials/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            name: user.displayName,
          })
        });
        
      }
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("name", user.displayName);

    } catch (error) {
      setError(errorMessages.googleAuthFailed);
    }
  };
  

  const signup = async (newUser) => {
    const { name, email, password } = newUser;
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateName(name, user);
  };

  const updateName = async (name, user = currentUser) => {
    await updateProfile(user, { displayName: name });
    setUserName(name);
    console.log(name);
  };

  const updateUserInfo = (updatedUser) => {
    setUser(updatedUser);
  };


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loginWithEmailAndPwd,
        signup,
        loginWithGoogle,
        userName,
        setCurrentUser,
        setUserName,
        storedUserId,
        user,
        setUser,
        updateUserInfo,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);