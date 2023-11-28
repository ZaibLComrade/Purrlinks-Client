import axios from "axios"
import url from "../router/url";

export default function useAxiosSecure() {
	const axiosSecure = axios.create({
		baseURL: url,
		withCredentials: true,
	})
	
	return axiosSecure
}
