import Avatar from "@/components/Avatar";
import HeadingCustom from "@/components/HeadingCustom";
import Paragraph from "@/components/Paragraph";

const Biography = () => {
  return (
    <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr] py-16 max-sm:py-8">
      <HeadingCustom size="md" className="col-start-1">
        About Me
      </HeadingCustom>

      <Paragraph>
        <p>
          Hey, I’m Andy! I grew up in the Pacific Northwest and love all things
          creative. From the misty forests to the vibrant city streets, my
          surroundings have always fueled my passion for design and coding.
          <br />
          As a self-taught developer, I found my calling in blending artistic
          flair with technical skill. My journey has led me to specialize in
          front-end development, where I craft interactive experiences that are
          not just functional, but also visually stunning.
          <br />
          When I&apos;m not coding, you&apos;ll find me experimenting with
          digital art or exploring the latest in web animation.
          <br />
          Join me as I continue to push the boundaries of what&apos;s possible
          in the digital world!
        </p>
      </Paragraph>

      <Avatar
        image={
          "https://images.unsplash.com/photo-1488372759477-a7f4aa078cb6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
      />
    </div>
  );
};

export default Biography;
