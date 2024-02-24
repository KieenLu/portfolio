import Bounded from "@/components/Bounded";
import ProjectWrapper from "@/components/ProjectItem";

const BlogPostIndex = () => {
  return (
    <div className="py-16 max-md:py-8">
      <Bounded>
        <h1 className="font-bold text-4xl">Projects</h1>

        <div className="prose prose-xl prose-invert mb-10 max-sm:mb-5">
          A selection of some of my favorite website and design projects.
        </div>
        <ProjectWrapper />
      </Bounded>
    </div>
  );
};

export default BlogPostIndex;
