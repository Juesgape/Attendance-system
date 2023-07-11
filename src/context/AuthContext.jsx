import { useContext, createContext, useEffect, useState } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {auth} from "../Pages/Firebase";

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    //Checking if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    },[])

    return(
        <AuthContext.Provider
            value={{
                googleSignIn,
                logOut,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const UserAuth = () => {
    return useContext(AuthContext)
}

export {
    AuthContextProvider,
    UserAuth
}