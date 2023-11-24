import category from "./categoryData";
import { Link } from "react-router-dom";

export default function Category() {
	const rightArrowStyle = "h-0 w-0 border border-[30px] border-transparent border-r-0 border-l-primary";
	return <div className="container flex justify-center mx-auto my-10">
		<div className="flex pr-4 border-2 border-primary rounded-xl">
			<div className="flex">
				<div className="h-[60px] flex rounded-l-lg items-center justify-center bg-primary pl-4">
					<h4 className="text-xl">Categories</h4>
				</div>
				<div className={`${ rightArrowStyle }`}></div>
			</div>
			<div className="flex items-center justify-around">
				{
				category.map(({ label, icon: Icon }, i) => <Link 
						key={label}
					className={`px-5 group border border-transparent ${(i !== category.length -1) ? "border-r-primary" : ""}`}
					>
						<div className="flex items-center gap-1 hover:text-primary">
							<Icon className="text-3xl"/>
							<h5>{ label }</h5>
						</div>
					<div className="w-0 rounded-full h-[2px] group-hover:w-full delay-200 ease-out transition-all bg-primary"></div>
					</Link>)
				}
			</div>
		</div>
	</div>
}
