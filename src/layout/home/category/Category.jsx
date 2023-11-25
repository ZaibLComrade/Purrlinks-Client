import category from "./categoryData";
import { Link } from "react-router-dom";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { useState } from "react";

export default function Category() {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const rightArrowStyle = "h-0 w-0 border border-[30px] border-transparent border-r-0 border-l-primary";
	const maxItemDisplay = 5;
	const createCategoryItem = (label, Icon) => {
		return <Link 
			key={label}
			className={`px-5 group max-lg:py-3 border max-md:flex justify-center max-md:w-full border-transparent max-md:border-b-primary md:border-r-primary`}
		>
			<div className="flex items-center gap-1 hover:text-primary">
				<Icon className="text-3xl"/>
				<h5>{ label }</h5>
			</div>
			<div className="w-0 rounded-full hidden md:block h-[2px] group-hover:w-full delay-200 ease-out transition-all bg-primary"></div>
		</Link>
	}
	
	const createDropdownItem = (label, Icon) => {
		return <Link 
			key={label}
			className={`px-5`}
		>
			<div className="flex items-center gap-1 hover:text-primary">
				<Icon className="text-3xl"/>
				<h5>{ label }</h5>
			</div>
		</Link>
	}
	
	return <div className="container flex justify-center px-4 mx-auto my-10">
		<div className="relative w-full border-2 md:w-auto lg:flex border-primary rounded-xl">
			<div className="flex">
				<div className="h-[60px] lg:w-auto w-full flex max-lg:rounded-t-lg lg:rounded-l-lg items-center justify-center bg-primary px-4 lg:pl-4">
					<h4 className="text-xl text-white">Categories</h4>
				</div>
				<div className={`${ rightArrowStyle } hidden lg:block`}></div>
			</div>
			<div className="flex flex-col items-center justify-around md:flex-row">
				{
				category.map(({ label, icon: Icon }, i) => {
					if(i < maxItemDisplay) {
						return createCategoryItem(label, Icon);
					}})
				}
				
				{/* Menu */}
				{
					(maxItemDisplay < category.length) && <div onClick={ () => setIsOpenMenu(!isOpenMenu) } className="flex items-center px-5 border border-transparent hover:text-primary group max-lg:py-3">
						<h5>More</h5>
						{!isOpenMenu ? 
							<MdOutlineArrowDropDown className="text-2xl"/> 
							:
							<MdOutlineArrowDropUp className="text-2xl"/>
						}
					</div>
				}
			</div>
			
			{/* Dropdown */}
			{
				isOpenMenu && <div className={`md:right-3 right-0 absolute lg:-bottom-14 z-[9999]`}>
				<div className="border rounded-bl-lg border-secondary-2 md:rounded-b-lg w-max bg-neutral">
					<ul className="py-2 px-8 h-[100px] overflow-y-scroll dropdown divide-y">
						{
							category.map(({ label, icon: Icon }, i) => {
								if(i >= maxItemDisplay) return createDropdownItem(label, Icon)
						})
						}
					</ul>
				</div>
			</div>
			}
		</div>
	</div>
}
