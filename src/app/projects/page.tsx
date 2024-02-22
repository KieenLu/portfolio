import Bounded from "@/components/Bounded";
import HeadingCustom from "@/components/HeadingCustom";
import ProjectWrapper from "@/components/ProjectItem";

const BlogPostIndex = () => {
  return (
    <div className="py-16 max-sm:py-8">
      <Bounded>
        <HeadingCustom size="xl" className="mb-8 max-sm:mb-4">
          Projects
        </HeadingCustom>
        <div className="prose prose-xl prose-invert mb-10 max-sm:mb-5">
          A selection of some of my favorite website and design projects.
        </div>
        <ProjectWrapper />
      </Bounded>
    </div>
  );
};

export default BlogPostIndex;
