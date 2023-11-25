import servicesData from "./servicesData";
import Header from "../../../components/headers/Header";

import servicesImg from "../../../assets/services.jpg";

// TODO: Code needs to be optimized

export default function Services() {
	return <div className="container mx-auto">
		<Header title="Our Services" subtitle="Discover a Seamless Journey to Uniting Hearts and Paws" />
		<div className="hidden p-4 lg:grid grid-cols-3 md:p-8 grid-rows-3 gap-10">
			<div className="flex items-center justify-center col-start-2 rows-start-2 row-span-3">
				<img src={ servicesImg } className="rounded-lg"/>
			</div>
			
			{ 
				servicesData.map(({ title, description, icon }, i) => <div 
					key={ title }
					className={`flex items-center gap-4 ${(i < 3 ) ? `col-start-1 row-start-${(i + 1)}` : `col-start-3 row-start-${(i + 1) % 3}`}`}
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
				servicesData.map(({ title, description, icon }, i) => <div 
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
