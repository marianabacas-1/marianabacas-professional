import React from "react";

const WebTitle = ({ text }) => {
  return (
    <div className="flex justify-center mt-8 md:mt-0">
      <div className="text-center inline-block">
        <h1
          className="relative text-4xl md:text-6xl font-extrabold tracking-tight 
          text-transparent bg-clip-text bg-gradient-to-r from-primaryWithOp2 via-primary to-primaryWithOp2
          drop-shadow-xl animate-fadeIn"
        >
          {text}
        </h1>
        <span
          className="block h-1 rounded-full 
          bg-gradient-to-r from-primaryWithOp2 via-primary to-primaryWithOp2
          origin-center scale-x-0 animate-expandLine"
        ></span>
      </div>
    </div>
  );
};

export default WebTitle;
