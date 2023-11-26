import LoginForm from "./RegisterForm";

export default function RegisterPage() {
	
	return <div>
		<div className="flex items-center justify-center h-screen">
			<div></div>
			<div className="flex flex-col items-center justify-center h-full gap-8">
				<h1 className="mx-auto text-3xl font-semibold w-max font-montserrat">
					Sign Up
				</h1>
				<LoginForm/>
			</div>
		</div>
	</div>
}
