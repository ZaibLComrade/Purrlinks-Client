import auth from "../config/firebase.config";
import { 
	signOut,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../hooks/useAxiosPublic";
import axios from "axios";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const axiosPublic = useAxiosPublic();
	
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, currentUser => {
			const userEmail = currentUser?.email || user?.email
			
			const userCredential = { email: userEmail };
			setUser(currentUser);
			setLoading(false)
			
			if(currentUser) {
				axios.post("https://purrlinks-server.vercel.app/authenticate?method=login", userCredential);
			} else {
				axios.post("https://purrlinks-server.vercel.app/authenticate?method=logout", userCredential);
			}
		})
		
		return () => unSubscribe();
	}, [user?.email, axiosPublic])
	
	const loginUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	}
	
	const registerUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	}
	
	const updateUser = (name, image) => {
		setLoading(true);
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: image,
		})
	}
	
	const googleSignIn = () => {
		setLoading(true);
		const provider = new GoogleAuthProvider;
		return signInWithPopup(auth, provider);
	}
	
	const facebookSignIn = () => {
		setLoading(true);
		const provider = new FacebookAuthProvider();
		return signInWithPopup(auth, provider);
	}
	
	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	}
	
	const authUtilities = {
		user,
		logOut,
		loading,
		loginUser,
		setLoading,
		updateUser,
		googleSignIn,
		registerUser,
		facebookSignIn,
	}
	return <AuthContext.Provider value={ authUtilities }>
		{ children }
	</AuthContext.Provider>
}

AuthProvider.propTypes = {
	children: PropTypes.node,
}
