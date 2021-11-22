import { useEffect, useState } from 'react';
import initializeFirebase from '../Firebase/firebase.init';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
initializeFirebase();
const provider = new GoogleAuthProvider();
const useFirebase = () => {
    const [user,setUser]=useState({})
    const auth = getAuth();
    const [isloading, setisloading] = useState(true);

    const googleSign = () => {
        return signInWithPopup(auth, provider)
         
    }
//observer
    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
           setUser(user)
          } else {
            setUser({})
            }
            setisloading(false);
        });
        return () => unSubscribe;
    },[auth])
    const logOut = () => {
        signOut(auth)
          .then(() => {
            setUser({})
          })

    }
    return { googleSign, user, setUser, logOut, isloading };
};

export default useFirebase;