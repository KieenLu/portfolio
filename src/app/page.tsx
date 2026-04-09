"use client";

import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import HomeBanner from "@/components/HomeBanner";
import PersonalProject from "@/components/PersonalProeject";
// import PreloaderScreen from "@/components/PreloaderScreen";

export default function Homepage() {
    return (
        <>
            <div className="relative w-full min-h-screen">
                <HomeBanner />

                <div className="mt-10">
                    <AboutMe />
                    <PersonalProject />
                </div>

                <Footer />
            </div>
        </>
    );
}
