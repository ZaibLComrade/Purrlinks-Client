import PropTypes from "prop-types";
import {useState} from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import dummyImage from "../../assets/dummy-user.jpg";

export default function Navbar({ props }) {
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const { toggleSidebar, setToggleSidebar } = props;
	const { user, logOut } = useAuth();
	
	const navlinks = <>
		<li><NavLink to="/">Home</NavLink></li>
		<li><NavLink to="/pets/available">Pet Listing</NavLink></li>
		<li><NavLink to="/donation/campaigns">Donation Campaign</NavLink></li>
	</>
	
	return <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
		<div className="px-4 py-3 md:px-8 lg:px-5 lg:pl-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-start rtl:justify-end">
					<button
						onClick={ () => setToggleSidebar(!toggleSidebar) }
						type="button"
						className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2"
					>
						<span className="sr-only">Open sidebar</span>
							<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
							</svg>
					</button>
					<Link to="/" className="flex ms-2 md:me-24">
						<img
							src="/logo.png"
							className="w-10 md:w-12 lg:w-14 me-3"
							alt="FlowBite Logo"
						/>
						<span className="self-center text-3xl font-semibold tracking-wider md:text-4xl lg:text-6xl font-banger text-primary sm:text-3xl whitespace-nowrap">
							Purrlinks
						</span>
					</Link>
				</div>
				
				{/* Navlinks */}
				<div>
					<div className="hidden md:block text-title font-opensans">
						<ul className="flex text:md lg:text-lg lg:gap-5 gap-3">
							{ navlinks }
							{
								!user && <li><NavLink to="/login">Login</NavLink></li>
							}
						</ul>
					</div>
				</div>
				
				<div className="relative flex items-center ">
					<div className="flex items-center ms-3">
		<div className="flex">
			<button onClick={ () => {setToggleDropdown(!toggleDropdown)} } className="w-12 h-12 rounded-full outline outline-black/5 hover:outline-black/10 transition ease-out duration-200 hover:-translate-y-px md:h-12">
				<div className="w-full h-full">
					<img 
						src={ user.photoURL } 
						className="object-cover w-full h-full rounded-full"
					/>
				</div>
			</button>
		</div>
						
						{/* Dropdown */}
						<div
							className={`z-50 ${toggleDropdown ? "block" : "hidden"} my-4 absolute top-8 right-0 text-base list-none bg-white rounded shadow divide-y divide-gray-100`}
						>
							{ user && <div className="px-4 py-3" role="none">
								<p className="text-sm text-gray-900">{ user.displayName }</p>
								<p className="text-sm font-medium text-gray-900 truncate">{ user.email }</p>
							</div>}
							<ul className="py-1">
								<li>
									<NavLink
										to="/dashboard"
										className="flex justify-start block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
									>
										Dashboard
									</NavLink>
								</li>
								{user && <li>
									<button 
										to="/dashboard"
										className="flex justify-start block w-full py-2 pl-4 text-sm text-gray-700 hover:bg-gray-100"
										onClick={ logOut }>Logout</button>
								</li>}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
}

Navbar.propTypes = {
	props: PropTypes.object,
	toggleSidebar: PropTypes.bool,
	setToggleSidebar: PropTypes.func,
}
