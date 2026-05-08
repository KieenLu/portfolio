const BriefAboutContent = () => {
    return (
        <div className="font-mono text-base leading-relaxed flex flex-col">
            <p className="mb-3">
                <span className="text-gray-300">1. </span>
                Nice to meet you! My name is <span className="text-green-400">Lu Trung Kien</span>,
                a <span className="text-yellow-400">Web Developer</span> passionate about building
                modern web experiences.
            </p>
            <p className="mb-3">
                <span className="text-gray-300">2. </span>I&apos;m specialized in{" "}
                <span className="text-blue-400">React</span>,{" "}
                <span className="text-cyan-400">Next.js</span>, focusing on creating{" "}
                <span className="text-green-400">fast</span>,{" "}
                <span className="text-green-400">smooth</span>, and{" "}
                <span className="text-green-400">engaging</span> user interfaces.
            </p>
            <p className="mb-3">
                <span className="text-gray-300">3. </span>
                With experiences in both <span className="text-yellow-400">frontend</span> and{" "}
                <span className="text-red-400">backend</span>, I can collaborate effectively and
                contribute to building <span className="text-blue-400">scalable products</span>.
            </p>
            <p>
                <span className="text-gray-300">4. </span>
                Coding for me is more than a job — I enjoy{" "}
                <span className="text-purple-400">experimenting</span> with new technologies,{" "}
                <span className="text-yellow-400">optimizing performance</span>, and turning complex
                ideas into <span className="text-green-400">modular solutions</span>.
            </p>
        </div>
    );
};

export default BriefAboutContent;
