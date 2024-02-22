import React from "react";

const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="prose prose-xl max-sm:prose-base prose-slate prose-invert col-start-1">
      {children}
    </div>
  );
};

export default Paragraph;
