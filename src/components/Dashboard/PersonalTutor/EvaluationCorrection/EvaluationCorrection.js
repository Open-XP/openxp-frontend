import react, { Component } from "react";
import PersonalLearningNavbar from "../PersonalLearningNavbar/PersonalLearningNavbar";
import ArrowLeftSVG from "../../../../svgs/ArrowLeftSVG.svg";
import ExitSVG from "../../../../svgs/ExitSVG.svg";

class EvaluationCorrection extends Component {
  render() {
    return (
      <div className="flex flex-col w-full h-full bg-[#F9FAFB]">
        <PersonalLearningNavbar />
        <img
          src={ExitSVG}
          alt="exit"
          className="size-[2rem] cursor-pointer fixed top-[10rem] right-[5rem]"
        />
        <div className="flex flex-col w-full min-h-screen  shadow-custom2 justify-center items-center py-[10rem] gap-[4rem] px-[2rem]">
          <div className="w-[91%] flex flex-col items-center">
            <div className="w-[92%] flex flex-col gap-[1rem]">
              <img
                src={ArrowLeftSVG}
                alt="arrow-left"
                className="w-[2rem] h-[2rem] cursor-pointer relative left-0"
              />
              <div className="font-[700] text-[3rem] font-SFPro">
                Evaluation correction
              </div>
            </div>
            <div className="flex flex-col w-full bg-white px-[4%] py-[2rem]">
              <div className="flex flex-col gap-[3rem]">
                <div className="font-[700] text-[2.5rem] font-SFPro leading-[2.983rem]">
                  Question 1
                </div>
                <div className="font-[500] text-[3rem] leading-[3.58rem] font-SFPro text-[#3C3C3C]">
                  Which of the following is the acceleration due to gravity on
                  Earth?
                </div>
                <div className="flex justify-between font-[500] text-[2rem] leading-[2.387rem]">
                  <div>Correct Answer (A)</div>
                  <div className="text-[#EB6C11]">View explanation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EvaluationCorrection;
