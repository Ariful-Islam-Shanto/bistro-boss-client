import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import useAxios from '../Hooks/useAxios';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unSubscrive = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // setLoading(false);

            if(currentUser) {
                const email = currentUser.email;
                const loggedUser = {email : email};
                axiosPublic.post('/jwt', loggedUser)
                .then(res => {
                    if(res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }else {
                localStorage.removeItem('access-token');
                setLoading(true);
            }
            
        })


        return () => {
            unSubscrive();
        }
    }, [axiosPublic])

    const authInfo = {user, loading, createUser, signIn, logOut, googleLogin};
    
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
      
};

export default AuthProvider;