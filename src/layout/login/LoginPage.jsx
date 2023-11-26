import LoginForm from "./LoginForm";
import { useLocation } from "react-router";

export default function LoginPage() {
	const location = useLocation();
	
	return <div>
		{location.state && (
			<div className="mx-auto mb-6 h-max w-max">
				<h1 className="md:text-5xl font-montserrat font-semibold text-white text-2xl leading-[80px]">
					Login To Continue
				</h1>
			</div>
		)}
		

		
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
