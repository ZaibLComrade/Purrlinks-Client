import { IoSearchSharp } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { GoGoal } from "react-icons/go";

const adoptionSteps = [
  {
    step: 1,
	  icon: IoSearchSharp,
    title: "Explore Profiles",
    description: "Browse through our curated profiles of adorable pets waiting for a loving home. Each profile showcases their unique personalities, making it easy to find your perfect match."
  },
  {
    step: 2,
	  icon: FaFileUpload,
    title: "Submit Your Application",
    description: "Once you've found a pet that steals your heart, submit a simple adoption application. This helps us understand your lifestyle and preferences, ensuring a perfect match for both you and your new companion."
  },
  {
    step: 3,
	  icon: GoGoal,
    title: "Meet Your Match",
    description: "Our team will review your application and arrange a meet-and-greet with your chosen pet. This is an opportunity to bond and ensure that it's a harmonious connection for both you and your future furry friend."
  },
  {
    step: 4,
	  icon: FaHandshake,
    title: "Finalize the Adoption",
    description: "After the meet-and-greet, if all goes well, it's time to finalize the adoption. Our team will guide you through the necessary paperwork and provide you with all the information you need for a smooth transition."
  }
];

export default adoptionSteps;
