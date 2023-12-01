import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
	const auth = useContext(AuthContext);
	return auth;
}
