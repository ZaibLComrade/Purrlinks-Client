import { NavLink } from "react-router-dom"
import dummyUser from "../../assets/dummy-user.jpg";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
	const navlinks = <>
		<NavLink to="/">Home</NavLink>
		<NavLink to="/pet-listing">Pet Listing</NavLink>
		<NavLink to="/donation">Donation Campaign</NavLink>
		<NavLink to="/register">Register</NavLink>
	</>
	
		return <div className="flex items-center justify-between px-8 h-14 md:h-24 bg-secondary-2">
		{/* Logo */}
		<div className="flex items-center hidden gap-4">
			<img className="w-16" src="/logo.png" alt="Logo"/>
			<h1 className="text-6xl text-primary font-banger">Purrlinks</h1>
		</div>
		<div className="">
			<RxHamburgerMenu className="text-2xl"/>
		</div>
		
		{/* Navlinks */}
		{/* <div className="flex text-lg font-opensans gap-5"> */}
		{/* 	{ navlinks } */}
		{/* </div> */}
		
		{/* User */}
		<div className="flex">
			<button className="h-10 rounded-full outline outline-black/5 hover:outline-black/10 transition ease-out duration-200 hover:-translate-y-px md:h-12">
				<img 
					src={ dummyUser } 
					alt="Dummy User" 
					className="object-contain h-full rounded-full"
				/>
			</button>
		</div>
	</div>
}
