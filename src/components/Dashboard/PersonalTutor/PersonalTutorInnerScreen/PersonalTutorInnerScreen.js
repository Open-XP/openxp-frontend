import React, { Component } from "react";
import OpenxpSVG from "../../../../svgs/openxp";
import MagnifyingLenseSVG from "../../../../svgs/MagnifyingLenseSVG.svg";
import NotificationBellSVG from "../../../../svgs/NotificationBellSVG.svg";
import ArrowLeftSVG from "../../../../svgs/ArrowLeftSVG.svg";
import FileArrowDownloadSVG from "../../../../svgs/FileArrowDownloadSVG.svg";
import LeftArrowSVG from "../../../../svgs/LeftArrowSVG.svg";
import RightArrowSVG from "../../../../svgs/RightArrowSVG.svg";
import SimpleExplanationLoader from "../SimpleExplanationLoader/SimpleExplanationLoader";
import GiveSimpleExplanation from "../GiveSimpleExplanation/GiveSimpleExplanation";
import ReferenceImage from "../ReferenceImagePage/ReferenceImagePage";
import ExplainFurtherPage from "../ExplainFurtherPage/ExplainFurtherPage";

class PersonalTutorInnerScreen extends Component {
  render() {
    return (
      <div className="flex flex-col w-full h-full">
        <div className="fixed w-full h-[5.25rem] px-[4.5%] flex justify-between shadow-custom items-center z-10 bg-white">
          <div className="flex h-[2.063rem] items-center gap-[0.813rem]">
            <OpenxpSVG className="w-[1.813rem] h-full text-purple-primary" />
            <div className="font-sans h-full font-[700] text-[1.25rem]">
              Openxp
            </div>
          </div>
          <div className="flex h-[2rem] gap-[2.063rem]">
            <img className="size-[2rem]" src={MagnifyingLenseSVG} />
            <img className="size-[2rem]" src={NotificationBellSVG} />
          </div>
        </div>
        <div className="flex flex-col w-full h-full bg-[#F9FAFB] shadow-custom2 justify-center items-center pt-[10rem]">
          <div className="flex flex-col w-[91%] h-lvh mb-[5rem] bg-white px-[4%] pt-[4%] gap-[1.5rem]">
            <div className="flex flex-col w-full item-center">
              <img className="size-[2.625rem]" src={ArrowLeftSVG} />
              <div className="flex py-[1rem] justify-between gap-[1rem]">
                <div className="flex max-w-[60%] 2xl:max-w-[40%] font-SFPro font-[700] text-[2rem] leading-[2.387rem]">
                  Lesson 1: The Fundamentals of Motion
                </div>
                <button className="flex bg-[#34C759] w-[25%] 2xl:w-[14%] py-[1rem] justify-center items-center gap-[0.625rem] rounded-[0.625rem]">
                  <div className="font-[700] text-[1.25rem] text-white">
                    Download as pdf
                  </div>
                  <img src={FileArrowDownloadSVG} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="flex flex-col w-full">
                <div
                  className="flex w-full h-[0.688rem] rounded-[3.563rem]"
                  style={{ background: "rgba(40, 18, 102, 0.23)" }}
                >
                  <div className="w-[10%] rounded-[3.563rem] bg-purple-primary"></div>
                </div>
              </div>
              <div className="font-SFPro font-[700] text-[1.375rem] leading-[1.641rem] text-purple-primary">
                1/9
              </div>
            </div>
            <div>
              <div className="font-[700] font-SFPro text-[3rem] leading-[3.58rem]">
                The Definition of Motion
              </div>
              <div className="font-[400] font-SFPro text-[2rem] leading-[2.387rem]">
                Motion is the change in position of an object over time relative
                to a reference point. It involves the object's movement from one
                place to another and can be described in terms of speed,
                direction, velocity, and acceleration. Motion can occur in
                different forms, such as linear, rotational, or oscillatory
                motion. It can be uniform, with constant speed and direction, or
                non-uniform, where the speed or direction changes.
              </div>
            </div>
            <SimpleExplanationLoader />
            <GiveSimpleExplanation />
            <ReferenceImage />
            <ExplainFurtherPage />
            <div className="flex flex-col gap-[0.625rem]">
              <button className="bg-[#E8EDF3] w-[60%] 2xl:w-[40%] h-[5.313rem] font-geist font-[300] text-[2rem] rounded-[0.813rem]">
                Give me a simpler explanation
              </button>
              <button className="bg-purple-primary w-[60%] 2xl:w-[40%] text-white h-[5.313rem] font-geist font-[300] text-[2rem] rounded-[0.813rem]">
                Give Real Life Scenario
              </button>
              <button className="bg-[#E8EDF3] w-[60%] 2xl:w-[40%] h-[5.313rem] font-geist font-[300] text-[2rem] rounded-[0.813rem]">
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="fixed font-geist font-[500] text-[1.5rem] flex gap-[0.438rem] w-[33rem] h-[2.125rem] leading-[1.86rem] z-30 top-[80%] left-0 right-0 bottom-0 m-auto justify-center items-center">
          <img className="size-[1.5rem] px-13px py-4px" src={LeftArrowSVG} />
          <div className="size-[2.125rem] py-[4px] text-center">1</div>
          <div className="size-[2.125rem] py-[4px] text-center">2</div>
          <div className="size-[2.125rem] py-[4px] text-center">3</div>
          <div className="size-[2.125rem] py-[4px] text-center">4</div>
          <div className="size-[2.125rem] py-[4px] text-center">5</div>
          <div className="size-[2.125rem] py-[4px] text-center">6</div>
          <div className="size-[2.125rem] py-[4px] text-center">7</div>
          <div className="size-[2.125rem] py-[4px] text-center">8</div>
          <div className="size-[2.125rem] py-[4px] text-center">9</div>
          <div className="size-[2.125rem] py-[4px] text-center">10</div>
          <img className="size-[1.5rem] px-13px py-4px" src={RightArrowSVG} />
        </div>
      </div>
    );
  }
}

export default PersonalTutorInnerScreen;
