import { Formik, Field, Form, ErrorMessage } from "formik";

export default function LoginForm() {
	return <div className="flex w-full max-w-xs border-2 rounded-lg font-montserrat border-primary">
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validate ={ values => {
				const errors = {};
				
				if (!values.email) {
					errors.email = 'Required';
				} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
					errors.email = 'Invalid email address';
				} 
				
				if (!values.password) {
					errors.password = 'Required';
				} else if (values.password.length > 15) {
					errors.password = 'Must be 15 characters or less';
				}
				
				return errors;
			}}
			onSubmit={ (values) => {
				alert(JSON.stringify(values, null, 2));
			}}
		>
			<Form className="px-8 pt-6 pb-8 bg-white rounded-lg shadow-md">
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-bold text-gray-700" 
						htmlFor="email"
					>
						Email
					</label>
					<Field 
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
						id="email" 
						name="email"
						type="email" 
						placeholder="Email"
					/>
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="email"/>
					</p>
				</div>
				
				<div className="mb-4">
					<label 
						className="block mb-2 text-sm font-bold text-gray-700" 
						htmlFor="password"
					>
						Password
					</label>
					<Field 
						className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
						id="password" 
						name="password"
						type="password" 
						placeholder="Password"
					/>
					<p className="text-xs italic text-red-500">
						<ErrorMessage name="password"/>
					</p>
				</div>
				
				<div className="flex items-center justify-between font-opensans">
					<button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
						Sign In
					</button>
						<a className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800" href="#">
							Forgot Password?
						</a>
				</div>
			</Form>
		</Formik>
	</div>
}
