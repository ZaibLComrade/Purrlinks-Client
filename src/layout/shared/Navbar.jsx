import { Link, NavLink } from "react-router-dom"
import dummyUser from "../../assets/dummy-user.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
	const [openMenu, setOpenMenu] = useState(false);
	const [openAvatar, setOpenAvatar] = useState(false);
	const { user, logOut } = useAuth();
	const dropdownListStyle = "flex justify-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
	
	const navlinks = <>
		<li><NavLink to="/">Home</NavLink></li>
		<li><NavLink to="/pets/available">Pet Listing</NavLink></li>
		<li><NavLink to="/donation/campaigns">Donation Campaign</NavLink></li>
	</>
	return <div className="z-[9999]">
		<div className="relative flex items-center justify-between h-20 px-8 md:h-24 bg-secondary-2">
		{/* Menu Icon displayed in small screen */}
			<div className="md:hidden">
				<button onClick={ () => {setOpenMenu(!openMenu); setOpenAvatar(false)} }>
				<RxHamburgerMenu className="text-2xl"/>
			</button> 
		</div>
		
		{/* Logo */}
		<button>
		<Link to="/" className="flex items-center lg:gap-4 gap-2">
			<img className="hidden w-12 md:block lg:w-16" src="/logo.png" alt="Logo"/>
			<h1 className="text-5xl lg:text-6xl text-primary font-banger">Purrlinks</h1>
		</Link>
		</button>
				
		{/* Menu Dropdown */}
		<div className={`z-50 ${openMenu ? "block md:hidden" : "hidden"} my-4 absolute top-14 left-2 text-base list-none bg-neutral rounded shadow divide-y divide-gray-100`} >
			<ul className="py-1">
				<li className={ dropdownListStyle }><NavLink to="/">Home</NavLink></li>
				<li className={ dropdownListStyle }><NavLink to="/pets/available">Pet Listing</NavLink></li>
				<li className={ dropdownListStyle }><NavLink to="/donation/campaigns">Donation Campaign</NavLink></li>
			</ul>
		</div>
			
		{/* Navlinks */}
		<div className="hidden md:block text-title font-opensans">
			<ul className="flex text:md lg:text-lg lg:gap-5 gap-3">
				{ navlinks }
				{
					!user && <li><NavLink to="/login">Login</NavLink></li>
				}
			</ul>
		</div>
		
		{/* User */}
		<div className="flex">
			<button onClick={ () => {setOpenAvatar(!openAvatar); setOpenMenu(false)} } className="w-12 h-12 rounded-full outline outline-black/5 hover:outline-black/10 transition ease-out duration-200 hover:-translate-y-px md:h-12">
				<div className="w-full h-full">
					<img 
						src={ user?.photoURL ? user.photoURL : dummyUser } 
						className="object-cover w-full h-full rounded-full"
					/>
				</div>
			</button>
		</div>
			
		{/* Avatar Dropdown */}
		<div className={`z-50 ${openAvatar ? "block" : "hidden"} my-4 absolute top-16 right-2 text-base list-none bg-neutral rounded shadow divide-y divide-gray-100`} >
			{ user ? <div className="px-4 py-3" role="none">
				<p className="text-sm text-gray-900">{ user.displayName }</p>
				<p className="text-sm font-medium text-gray-900 truncate">{ user.email }</p>
			</div>
			: <div className="px-4 py-3">
				<p className="text-sm font-medium text-gray-900">Not Logged In</p>
			</div>
			}
			<ul className="py-1 min-w-[130px]">
				{user  
					? <>
						<li className={ dropdownListStyle }><NavLink to="/dashboard">Dashboard</NavLink></li>
						<li className={ dropdownListStyle }><button onClick={ logOut }>Logout</button></li>
					</>
					: <li className={ dropdownListStyle }><NavLink to="/login">Login</NavLink></li>
				}
			</ul>
		</div>
		</div>
	</div>
}

