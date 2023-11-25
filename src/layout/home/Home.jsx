import Banner from "./banner/Banner";
import Category from "./category/Category";
import WhyUs from "./why-choose-us/WhyUs";
import AboutUs from "./about-us/AboutUs";
import Services from "./services/Services";

export default function Home() {
	return <div>
		<Banner/>
		<Category/>
		<WhyUs/>
		<AboutUs/>
		<Services/>
	</div>
}
