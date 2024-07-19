import React, { Component } from "react";
import ClockIcon from "../../../../icons/clock-icon.png";

class NoSchedule extends Component {
  render() {
    return (
      <div className="flex items-center 2xl:h-[30rem] h-[6.563rem] justify-between">
        <img
          className="w-[5.625rem] 2xl:w-[10.8%] h-[6rem] 2xl:h-[14rem] mr-4"
          src={ClockIcon}
          alt="Clock Icon"
        />
        <div className="w-[43.563rem] 2xl:w-[86%] h-[6.563rem] 2xl:h-[18rem] font-[700] 2xl:text-[6.75rem] text-[2.5rem] leading-[2.5rem] 2xl:leading-[8.026rem] font-inter text-[#667085] flex items-center justify-center">
          Your Schedule is empty because you do not have anything created
        </div>
      </div>
    );
  }
}

export default NoSchedule;
