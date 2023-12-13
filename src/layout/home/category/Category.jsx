import category from "./categoryData";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { useState } from "react";
import qs from "query-string";

export default function Category() {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [params, setParams] = useSearchParams()
	const navigate = useNavigate();
	const rightArrowStyle = "h-0 w-0 border border-[30px] border-transparent border-r-0 border-l-primary";
	const maxItemDisplay = 3;
	const handleCategoyItemClick = (label) => {
		let currentQueries = {};
		
		if(params) {
			currentQueries = qs.parse(params.toString())
			const updatedQuery = { ...currentQueries, category: label }
			const url = qs.stringifyUrl({
				url: "/pets",
				query: updatedQuery,
			})
			navigate(url);
		}
	}
	
	const createCategoryItem = (label, Icon) => {
		return <div 
			key={label}
			onClick={ () => handleCategoyItemClick(label) }
			className={`px-5 group max-lg:py-3 cursor-pointer border max-md:flex justify-center max-md:w-full border-transparent max-md:border-b-primary md:border-r-primary`}
		>
			<div className="flex items-center gap-1 hover:text-primary">
				<Icon className="text-3xl"/>
				<h5>{ label }</h5>
			</div>
			<div className="w-0 rounded-full hidden md:block h-[2px] group-hover:w-full delay-200 ease-out transition-all bg-primary"></div>
		</div>
	}
	
	const createDropdownItem = (label, Icon) => {
		return <div
			key={label}
			onClick={ () => handleCategoyItemClick(label) }
			className={`px-5`}
		>
			<div className="flex items-center cursor-pointer gap-1 hover:text-primary">
				<Icon className="text-3xl"/>
				<h5>{ label }</h5>
			</div>
		</div>
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
					(maxItemDisplay < category.length) && <div onClick={ () => setIsOpenMenu(!isOpenMenu) } className="flex items-center px-5 border border-transparent cursor-pointer hover:text-primary group max-lg:py-3">
						<h5>More</h5>
						{!isOpenMenu ? 
							<MdOutlineArrowDropDown className="text-2xl"/> 
							:
							<MdOutlineArrowDropUp className="text-2xl"/>
						}
					</div>
				}
			</div>
			
			{/* Overlay to close dropdowns */}
			<div onClick={ () => { setIsOpenMenu(false) } } className={`fixed ${isOpenMenu ? "block" : "hidden"} top-0 left-0 w-screen h-screen z-[50]`}></div>
			
			{/* Dropdown */}
			{
				isOpenMenu && <div className={`absolute shadow-lg rounded-lg right-0 lg:top-14 lg:-bottom-14 z-[9999]`}>
				<div className="border rounded-bl-lg border-secondary-2 w-max bg-neutral">
					<ul className="px-8 py-2 overflow-y-scroll dropdown divide-y">
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
