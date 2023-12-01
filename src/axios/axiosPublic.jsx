import axios from "axios";
import url from "../router/url";

const axiosPublic = axios.create({
	baseURL: url,
	withCredentials: true,
})

export default axiosPublic;
