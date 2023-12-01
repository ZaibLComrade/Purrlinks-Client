import LoginForm from "./LoginForm";
import { useLocation } from "react-router";

export default function LoginPage() {
	const location = useLocation();
	
	return <div>

		

		
		<div className="flex items-center justify-center h-screen">
			<div></div>

			<div className="flex flex-col items-center justify-center h-full gap-8">
				<h1 className="mx-auto text-3xl font-semibold w-max font-montserrat">
					Login
				</h1>
				<LoginForm/>
			</div>
		</div>
	</div>
}
