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
import axios from "axios";
import url from "../router/url";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ dashboardLoading, setDashboardLoading ] = useState(true);
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			const userEmail = currentUser?.email || user?.email;
			const userCredential = { email: userEmail }
			setUser(currentUser);
			setLoading(false);
			if(currentUser) {
				console.log("logged in", currentUser?.email);
				axios.post(`${url}/authenticate?method=login`, userCredential, { withCredentials: true })
			} else {
				console.log("logged out", currentUser?.email);
				axios.post(`${url}/authenticate?method=logout`, userCredential, { withCredentials: true })
			}
		})
		return () => unsubscribe();
	}, [user?.email])
	
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
		registerUser,
		googleSignIn,
		facebookSignIn,
		dashboardLoading,
		setDashboardLoading
	}
	return <AuthContext.Provider value={ authUtilities }>
		{ children }
	</AuthContext.Provider>
}

AuthProvider.propTypes = {
	children: PropTypes.node,
}
