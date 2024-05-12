"use client"
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import auth from "../../Firebase/firebase.config"

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading,setLoading]=useState(true);
  const router = useRouter();

  // const login = (username, password, email, cookie) => {
  //   setUser({ username, password, email, cookie });
  // };

  const setProfilePicture = (username,image_url) => {
    return updateProfile(auth.currentUser, {
      displayName:username,
      photoURL: image_url,
    });
  };
  const googleSignIn=()=>{
    return signInWithPopup(auth,googleProvider);
}

const createUser=(email,password)=>{
  setLoading(true);
  return createUserWithEmailAndPassword(auth,email,password);
}

const signIn=(email,password)=>{
  setLoading(true);
  return signInWithEmailAndPassword(auth,email,password);
}

  const checkUser = () => {
    console.log("user:  " + user.email);
    console.log("user:  " + user.cookie);
    if (user.email != null && user.cookie != null) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,currentUser=>{
            // console.log(currentUser);
            const userEmail=currentUser?.email||user?.email;
            const loggedUser={email:userEmail};
            console.log(loggedUser)
            setUser(currentUser);
            setLoading(false);
             if(currentUser){
                const userInfo={email: currentUser.email};
               
             }
             else{
               
                setLoading(false)
            }
    })
    return ()=>{
        unsubscribe();
    }
},[])
  const logout = () => {
    doSignOut();
  };
  async function doSignOut() {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setUser(null);
      document.cookie = null;

      router.push("/");
    } catch (error) {
      console.error("error failed: ", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading,
      setProfilePicture,
      googleSignIn,
      createUser,
      signIn, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
