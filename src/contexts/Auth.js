import { useState, useEffect, createContext, useContext } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAuth,
    onAuthStateChanged,
    updateEmail,
    updatePassword,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail

} from 'firebase/auth';

import { AUTH } from '../firebase.js';

import User from '../controllers/User.js';

const AuthContext = createContext();

export const AuthContentextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState({});

    const createAuthUser = (email, password) => {
        return createUserWithEmailAndPassword(AUTH, email, password)
    }

    const getCurrentAuthUser = () => {

        const currentAuth = getAuth();
        return getAuth;
    }

    const updateUserEmail = email => {
        return updateEmail(authUser.auth, email);
    }

    const updateUserPassword = password => {
        return updatePassword(authUser.auth, password);
    }

    const deleteUserAccount = () => {
        return deleteUser(authUser.auth);
    }

    const reAuthenticateUser = async password => {
        //const auth = await getAuth();
        //console.log(authUser.auth.email)
        const credential = await EmailAuthProvider.credential(
            authUser.auth.email,
            password
        );
        return reauthenticateWithCredential(authUser.auth, credential)
    }

    const verifyEmail = () => {
        return sendEmailVerification(authUser.auth);
    }

    const resetUserPassword = async email => {
        const auth = await getAuth();
        sendPasswordResetEmail(auth,email)
    }

    const updateAppUserProfile = data => {
        //console.log(authUser.auth)
        //console.log(authUser.auth.uid)
        return User.updateUserProfile(authUser.auth.uid, data);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(AUTH, email, password);
    }
    const logOut = () => {
        setAuthUser({})
        return signOut(AUTH);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(AUTH, usr => {
            const authObj = { usr };

            const afunc = async () => {

                const uid = usr!==null? usr.uid : 'not logged in';

                const data = await User.getUserProfile(uid);
                //console.log(usr);
                //console.log(data);

                return setAuthUser({ auth: usr, profile: data });

            }

            afunc();

        });
        return unsub;
    }, [])

    return (
        <AuthContext.Provider value={{
            authUser,
            getCurrentAuthUser,
            createAuthUser,
            logIn,
            logOut,
            updateAppUserProfile,
            updateUserEmail,
            updateUserPassword,
            deleteUserAccount,
            reAuthenticateUser,
            verifyEmail,
            resetUserPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}