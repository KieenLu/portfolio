"use client";

import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

import AboutMeBanner from "./AboutMeBanner";
import TechnicalBanner from "./TechnicalBanner";

const AboutPage = () => {
    return (
        <>
            <AboutMeBanner />
            <AboutMe />
            <TechnicalBanner />
            <Footer />
        </>
    );
};

export default AboutPage;
