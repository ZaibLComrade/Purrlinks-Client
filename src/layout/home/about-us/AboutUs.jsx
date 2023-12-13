import Header from "../../../components/headers/Header";
import purrImg from "../../../assets/parallax-min.jpg";
import adoptionSteps from "./adoptionProcess";
import { Parallax, Background } from "react-parallax";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";

export default function AboutUs() {
	return <div>
		<Header 
			title="About Us"
			subtitle="Get to know us better"
		/>
		
		<Parallax strength={ -200 } className="relative">
			<Background>
				<div className="w-screen bg-cover" style={{
					backgroundImage: `url(${purrImg})`,
					height: 2000,
				}}></div>
			</Background>
			<div className="">
				<div className="absolute z-10 w-full h-full bg-gradient-to-t from-black/30 to-black/30"></div>
				<div className="relative z-20 py-20 mx-auto">
					<h3 className="mb-4 text-xl text-center text-white md:text-3xl">--- Why Purrlinks was made?</h3>
					<div className="w-full mx-auto text-sm text-center text-white md:text-xl font-opensans">
						<ol className="items-center justify-around w-full place-items-center md:grid-cols-2 grid-cols-1 gap-6 grid lg:grid-cols-4 list-image-square space-y-4">
							<li className="grid h-full grid-rows-2 grid-cols-1 items-center max-w-[300px] gap-2"><FaHeart className="mx-auto text-4xl md:text-6xl"/><p>PurrLinks was crafted with a dual purpose in mind - to facilitate meaningful adoptions and to inspire compassionate giving.</p></li>
							<li className="grid grid-cols-1 grid-rows-2 h-full items-center max-w-[300px] gap-2"><FaHandHoldingHeart className="mx-auto text-4xl md:text-6xl"/><p>Our platform was born out of a desire to create a space where the joy of adoption meets the power of donations.</p></li>
							<li className="grid grid-cols-1 h-full grid-rows-2 items-center max-w-[300px] gap-2"><FaDonate className="mx-auto text-4xl md:text-6xl"/><p>It was created to unite pet lovers with their perfect companions while making a meaningful impact on the well-being of all pets through compassionate donations.</p></li>
							<li className="grid grid-cols-1 h-full items-center grid-rows-2 max-w-[300px] gap-2"><FaPaw className="mx-auto text-4xl md:text-6xl"/><p>PurrLinks was made to be a heartfelt intersection of adoption and compassionate giving, weaving stories of love and generosity with every purr.</p></li>
						</ol>
					</div>
				</div>
			</div>
		</Parallax>
		<div className="container py-20 mx-auto md:px-8 space-y-10">
			<h3 className="mx-auto mb-4 text-2xl text-center md:text-3xl text-primary">--- How does it work?</h3>
			<div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16">
				{
					adoptionSteps.map(({ step, icon: Icon, title, description }) => <div key={ step } className="relative p-4 bg-white border-2 rounded-lg shadow-lg border-secondary-1">
						<div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-accent-2 -right-4 -top-4">{ step }</div>
						<div className="text-center">
							<div className="flex justify-center mb-4">
								<Icon className="text-5xl text-primary"/>
							</div>
							<div className="mb-1 text-xl text-title">{ title }</div>
							<div className="text-sm text-subtitle">{ description }</div>
						</div>
					</div>)
				}
			</div>
		</div>
	</div>
}
