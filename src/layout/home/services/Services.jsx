import servicesData from "./servicesData";
import Header from "../../../components/headers/Header";

import servicesImg from "../../../assets/services.jpg";

// TODO: Code needs to be optimized

export default function Services() {
	return <div className="container mx-auto">
		<Header title="Our Services" subtitle="Discover a Seamless Journey to Uniting Hearts and Paws" />
		<div className="hidden lg:grid grid-cols-3 place-items-center md:p-8 grid-rows-3 gap-10">
			<div className="col-start-2 rows-start-2 row-span-3">
				<img src={ servicesImg } alt=""/>
			</div>
			{/* <div className="w-full h-[100px] col-start-1 row-start-1"></div> */}
			{/* <div className="w-full h-[100px] col-start-1 row-start-2"></div> */}
			{/* <div className="w-full h-[100px] col-start-1 row-start-3"></div> */}
			
			{/* <div className="w-full h-[100px] col-start-3 row-start-1"></div> */}
			{/* <div className="w-full h-[100px] col-start-3 row-start-2"></div> */}
			{/* <div className="w-full h-[100px] col-start-3 row-start-3"></div> */}
			
			{ 
				servicesData.map(({ title, description, icon, pos, col }) => <div 
					key={ pos + col }
					className={`flex items-center gap-4 row-start-${pos} col-start-${col}`}
				>
					<img 
						src={ icon }
						className="w-10 h-10 md:w-14 md:h-14"
					/>
					
					<div className="space-y-1">
						<h4 className="text-lg text-title lg:text-2xl">{ title }</h4>
						<p className="text-sm text-subtitle md:text-base">{ description }</p>
					</div>
				</div>)
			}
		</div>
		
		<div className="flex flex-col p-4 lg:hidden grid-cols-2 sm:grid md:p-8 gap-10">
			<div className="flex items-center justify-center hidden col-start-2 rows-start-2 row-span-3">
				<img src={ servicesImg } className="rounded-lg"/>
			</div>
			
			{ 
				servicesData.map(({ title, description, icon }) => <div 
					key={ title }
					className={`flex flex-col justify-center text-center items-center gap-4`}
				>
					<img 
						src={ icon }
						className="w-10 h-10 md:w-14 md:h-14"
					/>
					
					<div className="space-y-1">
						<h4 className="text-lg text-title lg:text-2xl">{ title }</h4>
						<p className="text-sm text-subtitle md:text-base">{ description }</p>
					</div>
				</div>)
			}
		</div>
	</div>
}
