import React, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp";
import "./SimpleExplanationLoader.css"; // Animation styles

class SimpleExplanationLoader extends Component {
  render() {
    return (
      <div>
        <div className="flex w-[13.75rem] items-center gap-[1rem]">
          <OpenxpSVG className="w-[1.813rem] h-[2.063rem]" />
          <div className="circle bg-[#D9D9D9] animation-delay-1"></div>
          <div className="circle bg-[#D9D9D9] animation-delay-2"></div>
          <div className="circle bg-[#D9D9D9] animation-delay-3"></div>
          <div className="circle bg-[#D9D9D9] animation-delay-4"></div>
          <div className="circle bg-[#D9D9D9] animation-delay-5"></div>
          <div className="circle bg-[#D9D9D9] animation-delay-6"></div>
        </div>
      </div>
    );
  }
}

export default SimpleExplanationLoader;
