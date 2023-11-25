import AboutUs from "./about-us/AboutUs";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import WhyUs from "./why-choose-us/WhyUs";

export default function Home() {
	return <div>
		<Banner/>
		<Category/>
		<WhyUs/>
		<AboutUs/>
	</div>
}
