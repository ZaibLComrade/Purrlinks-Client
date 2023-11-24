import { NavLink } from "react-router-dom"
import dummyUser from "../../assets/dummy-user.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Navbar() {
	const [openMenu, setOpenMenu] = useState(false);
	const [openAvatar, setOpenAvatar] = useState(false);
	
	const navlinks = <>
		<li><NavLink to="/">Home</NavLink></li>
		<li><NavLink to="/pet-listing">Pet Listing</NavLink></li>
		<li><NavLink to="/donation">Donation Campaign</NavLink></li>
		<li><NavLink to="/register">Register</NavLink></li>
	</>
	
	const avatarLinks = <>
		<li><NavLink to="/dashboard">DashBoard</NavLink></li>
		<li><button>Logout</button></li>
	</>
	
		return <div>
			<div className="relative flex items-center justify-between h-20 px-8 md:h-24 bg-secondary-2">
			{/* Displayed in small screen */}
				<div className="md:hidden">
					<button onClick={ () => {setOpenMenu(!openMenu); setOpenAvatar(false)} }>
					<RxHamburgerMenu className="text-2xl"/>
				</button> 
			</div>
			
			{/* Logo */}
				<div className="flex items-center lg:gap-4 gap-2">
					<img className="hidden w-12 md:block lg:w-16" src="/logo.png" alt="Logo"/>
					<h1 className="text-5xl lg:text-6xl text-primary font-banger">Purrlinks</h1>
			</div>
			
			{/* Navlinks */}
			<div className="hidden md:block font-opensans">
				<ul className="flex text:md lg:text-lg lg:gap-5 gap-3">
					{ navlinks }
				</ul>
			</div>
			
			{/* User */}
			<div className="flex">
				<button onClick={ () => {setOpenAvatar(!openAvatar); setOpenMenu(false)} } className="h-10 rounded-full outline outline-black/5 hover:outline-black/10 transition ease-out duration-200 hover:-translate-y-px md:h-12">
					<img 
						src={ dummyUser } 
						alt="Dummy User" 
						className="object-contain h-full rounded-full"
					/>
				</button>
			</div>
		</div>
		
		{/* Menu Dropdown */}
		{
			openMenu && <div className={`transition md:hidden ease-out left-0 absolute top-20 duration-1000 -z-10`}>
			<div className="border rounded-br-lg w-max bg-neutral">
				<ul className="py-2 dropdown divide-y">
					{ navlinks }
				</ul>
			</div>
		</div>
		}
		
		{/* Avatar Dropdown */}
		{
			openAvatar && <div className={`transition ease-out md:right-3 duration-1000 right-0 absolute top-20 md:top-24 -z-10`}>
				<div className="border rounded-bl-lg md:rounded-b-lg w-max bg-neutral">
					<ul className="py-2 dropdown divide-y">
						{ avatarLinks }
					</ul>
				</div>
			</div>
		}
	</div>
}
