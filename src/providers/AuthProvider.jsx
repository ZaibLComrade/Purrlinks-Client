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

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(true);
	
	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			setLoading(false)
		})
		
		return () => unSubscribe();
	}, [])
	
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
