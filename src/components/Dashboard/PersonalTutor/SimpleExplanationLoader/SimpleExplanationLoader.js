import react, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp";

class SimpleExplanationLoader extends Component {
  render() {
    return (
      <div>
        <div className="flex w-[13.75rem] items-center gap-[1rem]">
          <OpenxpSVG className="w-[1.813rem] h-[2.063rem]" />
          <div className="size-[11px] bg-[#D9D9D9] rounded-[50%]"></div>
          <div className="size-[11px] bg-[#D9D9D9] rounded-[50%]"></div>
          <div className="size-[11px] bg-[#D9D9D9] rounded-[50%]"></div>
          <div className="size-[11px] bg-[#D9D9D9] rounded-[50%]"></div>
          <div className="size-[11px] bg-[#D9D9D9] rounded-[50%]"></div>
          <div className="size-[11px] bg-[#D9D9D9] rounded-[50%]"></div>
        </div>
      </div>
    );
  }
}

export default SimpleExplanationLoader;
