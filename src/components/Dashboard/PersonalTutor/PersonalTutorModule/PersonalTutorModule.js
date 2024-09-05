import React, { Component } from "react";
import HumanMetaFigureSVG from "../../../../svgs/HumanMetaFigureSVG.svg";
import UpAndDownStuff from "../../../../svgs/UpAndDownStuff.svg";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";
import { Link } from "react-router-dom";

class PersonalTutorModule extends Component {
  render() {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-[95%] h-[68.875rem] my-[2rem]">
          <div className="flex w-full flex-col gap-[3rem]">
            <div className="size-[5.688]">
              <img src={HumanMetaFigureSVG} />
            </div>
            <div className="font-[700] font-SFPro leading-[2.983rem] text-[2.5rem]">
              What's your Ideal Learning Style
            </div>
            <div className="text-[#6D6262] font-SFPro font-[500] text-[1.375rem] leading-[1.641rem]">
              we'll use this to personalize your learning journey
            </div>
            <div className="flex flex-col gap-[1.5em]">
              <div className="font-[600] font-geist text-[1.5rem]">
                Learning Method
              </div>
              <div className="flex gap-[2.125rem] font-[400] text-[1.25rem] font-SFPro leading-[1.492rem]">
                <button className="w-[10.125rem] h-[2.75rem] border-[#667085] border-[1px] rounded-[1.375rem]">
                  AI tutor
                </button>
                <button className="w-[10.125rem] h-[2.75rem] border-[#667085] border-[1px] rounded-[1.375rem]">
                  Reading Method
                </button>
                <button className="w-[10.125rem] h-[2.75rem] border-[#667085] border-[1px] rounded-[1.375rem]">
                  Hybrid Method
                </button>
              </div>
            </div>
            <div className="flex gap-[5.313rem] w-full">
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Grade
                </div>
                <div className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between">
                  <div>Select Grade</div>
                  <img
                    className="w-[1.25rem] h-[2.313rem]"
                    src={UpAndDownStuff}
                  />
                </div>
              </div>

              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Subject
                </div>
                <div className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between">
                  <div>Select Subject</div>
                  <img
                    className="w-[1.25rem] h-[2.313rem]"
                    src={UpAndDownStuff}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-[5.313rem]">
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Topic
                </div>
                <div className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between">
                  <div>Select Topic</div>
                  <img
                    className="w-[1.25rem] h-[2.313rem]"
                    src={UpAndDownStuff}
                  />
                </div>
              </div>
              <div className="flex flex-col w-[80%]">
                <div className="font-geist font-[600] text-[1.5rem] leading-[1.86rem]">
                  Difficulty Level
                </div>
                <div className="flex w-full h-[3.875rem] bg-[#F6F6F6] items-center px-[2rem] text-[1.25rem] font-[400] font-SFPro leading-[1.492rem] justify-between">
                  <div>Select Difficulty</div>
                  <img
                    className="w-[1.25rem] h-[2.313rem]"
                    src={UpAndDownStuff}
                  />
                </div>
              </div>
            </div>
            <Link to="inner">
              <button className="flex justify-center items-center w-full h-[4.25rem] bg-[#EB6C11] rounded-[0.688rem] text-[2rem] font-[700] font-geist text-white">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalTutorModule;
