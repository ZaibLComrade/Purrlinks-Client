import {useQuery} from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useInAdmin() {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: isAdmin } = useQuery({
		queryKey: [user?.email, "isAdmin"],
		queryFn: async() => {
			const { data } = await axiosSecure(`/user?email=${user.email}`)
			return data.role === "admin";
		}
	})
	return isAdmin;
}
