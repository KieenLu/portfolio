import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";

const Homepage = () => {
    return (
        <>
            <Hero />

            <div className="mt-10">
                <AboutMe />
                <div className="text-7xl text-center text-main lg:w-6/12 h-96">content</div>
                <div className="text-7xl text-center text-main lg:w-6/12 h-96">content</div>
                <div className="text-7xl text-center text-main lg:w-6/12 h-96">content</div>
            </div>
        </>
    );
};

export default Homepage;
