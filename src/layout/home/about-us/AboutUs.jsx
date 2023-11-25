import Header from "../../../components/headers/Header";
import purrImg from "../../../assets/embrace-purr-2.jpeg";
import adoptionSteps from "./adoptionProcess";
import { FaRegSquare } from "react-icons/fa6";
import { Parallax, Background } from "react-parallax";

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
				<div className="absolute z-10 w-full h-full bg-gradient-to-b from-black/70 to-black/70"></div>
				<div className="relative z-20 py-12 mx-auto w-max">
					<h3 className="mb-4 text-xl text-center md:text-3xl text-primary">--- Why Purrlinks was made?</h3>
					<div className="mx-auto max-w-[300px] text-sm md:text-xl text-center text-white font-opensans md:max-w-[500px]">
						<ol className="list-image-square space-y-4">
							<li className="flex flex-col items-center gap-2"><FaRegSquare/><p>PurrLinks was crafted with a dual purpose in mind - to facilitate meaningful adoptions and to inspire compassionate giving.</p></li>
							<li className="flex flex-col items-center gap-2"><FaRegSquare/><p>Our platform was born out of a desire to create a space where the joy of adoption meets the power of donations.</p></li>
							<li className="flex flex-col items-center gap-2"><FaRegSquare/><p>It was created to unite pet lovers with their perfect companions while making a meaningful impact on the well-being of all pets through compassionate donations.</p></li>
							<li className="flex flex-col items-center gap-2"><FaRegSquare/><p>PurrLinks was made to be a heartfelt intersection of adoption and compassionate giving, weaving stories of love and generosity with every purr.</p></li>
						</ol>
					</div>
				</div>
			</div>
		</Parallax>
		<div className="container p-8 py-20 mx-auto space-y-10">
			<h3 className="mx-auto mb-4 text-2xl text-center md:text-3xl text-primary">--- How does it work?</h3>
			<div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16">
				{
					adoptionSteps.map(({ step, icon: Icon, title, description }) => <div key={ step } className="relative p-4 bg-white border-2 rounded-lg border-secondary-1">
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
