import axios from "axios"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import url from "../router/url";
import useAuth from "./useAuth";

export default function useAxiosSecure() {
	const axiosSecure = axios.create({
		baseURL: url,
		withCredentials: true,
	})
	
	const { logoutUser } = useAuth();
	const navigate = useNavigate();
	
	useEffect(() => {
		axiosSecure.interceptors.response.use(res => {
				return res;
			}, err => {
				if(err.response.status === 401) {
					logoutUser()
						.then(() => {
							Swal.fire({
								title: "User was logged out",
								text: "Invalid token",
								icon: "info",
								confirmButtonText: "Ok"
							}).then(() => navigate("/login"))
						})
						.catch(error => console.log(error))
				}
				else if(err.response.status === 403) {
					Swal.fire({
						title: "Access Forbidden",
						showConfirmButton: false,
						showDenyButton: true,
						denyButtonText: "Close"
					}).then((res) => {
						if(res.isDenied) navigate("/")
					})
				}
		})
	}, [])
	
	
	return axiosSecure
}
