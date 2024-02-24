import React from "react";

interface Props {
  skill: string;
}

const Skill = ({ skill }: Props) => {
  return (
    <div className="rounded transition-all duration-250 p-2 text-sm cursor-pointer bg-black text-white hover:bg-yellow-400 hover:text-black">
      {skill}
    </div>
  );
};

export default Skill;
