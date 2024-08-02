import React, { Component } from "react";
import OpenxpSVG from "../../../svgs/openxp.js";
import CloseButton from "../../../icons/closeIcon.png";
import ChartBar from "../../../icons/ChartBar.png";
import PencilEdit from "../../../icons/PencilSimpleLine.png";
import ProfilePicture from "../../../icons/profile-picture.png";
import SmileImage from "../../../icons/Smile.png";
import ManSitting from "../../../icons/man-sitting.png";
import PaperClip from "../../../icons/PaperclipHorizontal.png";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

class CareerBot extends Component {
  render() {
    return (
      <div className="w-[100%] h-screen flex flex-row justify-between">
        <div className="max-w-[30rem]  h-full px-[2rem] pt-[2rem] font-sans font-[700] leading-[2.724rem] flex flex-col gap-[4rem] relative shadow-custom2">
          <div className="flex flex-col gap-[3.5rem]">
            <div className="flex-shrink-0 w-full mt-[4rem] flex flex-row gap-[2rem]">
              <div className="flex h-[2.75rem] gap-2  w-fit">
                <div>
                  <OpenxpSVG className="text-purple-primary size-[2.625rem]" />
                </div>
                <div className="w-[11.875rem] text-[1.6rem] font-sans leading-[2.724rem] shrink">
                  Career Buddy
                </div>
              </div>
              <Link
                className="flex h-[2.75rem] size-[2.188rem] items-center"
                to={"../"}
              >
                <img
                  className="size-[2.188rem] cursor-pointer"
                  src={CloseButton}
                  alt="close button"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full gap-[1.5rem]">
              <div className="flex gap-3 items-center">
                <div className="size-[2.35rem] ">
                  <img src={PencilEdit} />
                </div>
                <div className="font-[600] font-manropes text-[1.5rem] leading-[2.049rem]">
                  New Conversation
                </div>
              </div>
              <div className="flex gap-3  items-center">
                <div className="size-[2.35rem]">
                  <img src={ChartBar} />
                </div>
                <div className="font-[600] font-manropes text-[1.5rem] leading-[2.049rem]">
                  Grade Analytics
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="font-[600] font-manropes text-[2.25rem] leading-[3.074rem] text-skyblue-secondary">
              History
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-[400] text-[1rem] leading-[1.366rem] text-[#3C3C3C]">
                Today
              </div>
              <div className="font-[500] font-manropes text-[1.25rem] leading-[1.708rem]">
                Tips to become an engineer
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-[400] text-[1rem] leading-[1.366rem] text-[#3C3C3C]">
                Yesterday
              </div>
              <div className="font-[500] font-manropes text-[1.25rem] leading-[1.708rem]">
                Learning Faster and quicker
              </div>
              <div className="font-[500] font-manropes text-[1.25rem] leading-[1.708rem]">
                Learning Faster and quicker
              </div>
              <div className="font-[500] font-manropes text-[1.25rem] leading-[1.708rem]">
                Learning Faster and quicker
              </div>
              <div className="font-[500] font-manropes text-[1.25rem] leading-[1.708rem]">
                Learning Faster and quicker
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex flex-row gap-[1rem] px-[2rem] w-[25%] h-[7rem] bg-white items-center">
          <img
            className="size-[3.25rem]"
            src={ProfilePicture}
            alt="profile picture"
          />
          <div className="flex justify-center items-center font-manropes font-[600] text-[2rem] h-[3.25rem]">
            Tunde Alani
          </div>
        </div>
        <div className="w-[90%] bg-[#4169E1]/[3%] flex">
          <div className="w-full flex flex-col items-center gap-[5rem]">
            <div className="w-[36.375rem] h-[9.781rem] mt-[5.688rem] flex flex-col items-center gap-[0.625rem]">
              <div className="w-[4.063rem] h-[3.719rem]">
                <img className="w-full" src={SmileImage} alt="smile Image" />
              </div>
              <div className=" font-inter font-[700] text-[2rem] leading-[2.421rem] text-[#4169E1]">
                Ask Career Buddy
              </div>
              <div class="font-inter font-[400] text-base leading-[1.21rem] text-center">
                Career Buddy uses your progress in OpenXP to give you clarity on
                career choices and paths
              </div>
            </div>
            <div className="flex w-[51.563rem] h-[17.938rem] gap-[3rem]">
              <div className="w-[15.188rem] h-[17.938rem] flex flex-col justify-center items-center bg-[#FFFFFF]/[3%] border-[1px] border-[#0000001F] rounded-[15px] gap-3">
                <img
                  className="w-[9.25rem] h-[10.313rem]"
                  src={ManSitting}
                  alt="man sitting"
                />
                <div className="font-[600] size-[0.938rem w-fit text-purple-primary font-manropes leading-[1.281rem]">
                  Study Tips & Techniques
                </div>
              </div>
              <div className="w-[15.188rem] h-[17.938rem] flex flex-col justify-center items-center bg-[#FFFFFF]/[3%] border-[#0000001F] border-[1px] rounded-[15px] gap-3">
                <img
                  className="w-[9.25rem] h-[10.313rem]"
                  src={ManSitting}
                  alt="man sitting"
                />
                <div className="font-[600] size-[0.938rem w-fit text-purple-primary font-manropes leading-[1.281rem]">
                  Career Advice & Consultations
                </div>
              </div>
              <div className="w-[15.188rem] h-[17.938rem] flex flex-col justify-center items-center bg-[#FFFFFF]/[3%] border-[#0000001F] border-[1px] rounded-[15px] gap-3">
                <img
                  className="w-[9.25rem] h-[10.313rem]"
                  src={ManSitting}
                  alt="man sitting"
                />
                <div className="font-[600] size-[0.938rem w-fit text-purple-primary font-manropes leading-[1.281rem]">
                  School Exam Research
                </div>
              </div>
            </div>
            <div className="fixed bottom-[5rem]">
              <div className="w-full flex flex-col items-center gap-5">
                <button className="absolute left-0 mt-[1.2rem] ml-[1.2rem]">
                  <img src={PaperClip} alt="paper clip" />
                </button>
                <input className="w-[51.563rem] h-[4.813rem] border-[1px] border-gray-300 rounded-[30px] focus:border-inherit focus:outline-none px-4" />
                <button className="absolute mt-[0.45rem] ml-[1.2rem] w-[4.188rem] h-[3.875rem] right-0 mr-[1.2rem] bg-skyblue-secondary rounded-[17px] flex justify-center items-center">
                  <div className="size-[40px]">
                    <ArrowUpIcon className="text-white size-full" />
                  </div>
                </button>
                <div className="font-manropes font-[400] text-[1rem] leading-[1.366rem]">
                  our model is only used to give insights and not final
                  decisions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CareerBot;
