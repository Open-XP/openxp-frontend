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
import { connect } from "react-redux";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import PropTypes from "prop-types";
import {
  StartCareerBuddySession,
  FetchIndividualChatSessions,
  FetchAllChatSessions,
} from "../../../Actions/AI.js";

class CareerBot extends Component {
  static propTypes = {
    StartCareerBuddySession: PropTypes.func.isRequired,
    FetchIndividualChatSessions: PropTypes.func.isRequired,
    FetchAllChatSessions: PropTypes.func.isRequired,
    careerBuddyStarted: PropTypes.bool.isRequired,
    loadingIndividualChatSessions: PropTypes.bool.isRequired,
    loadingAllChatSessions: PropTypes.bool.isRequired,
    individualChatSessions: PropTypes.array.isRequired,
    allChatSessions: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const {
      StartCareerBuddySession,
      FetchAllChatSessions,
      FetchIndividualChatSessions,
    } = this.props;
    StartCareerBuddySession();
    // FetchIndividualChatSessions();
    // FetchAllChatSessions();
  }

  noChat = () => {
    return (
      <div className="w-[100%] bg-[#4169E1]/[3%] flex">
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
                our model is only used to give insights and not final decisions
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  chatStarted = () => {
    return (
      <div className="w-full h-lvh flex flex-col">
        {/* Scrollable chat area */}
        <div className="flex-grow overflow-y-auto custom-scrollbar pr-4">
          <div className="w-full flex flex-col gap-[4rem] px-4 py-8">
            {/* Chat messages */}
            <div className="flex w-full justify-end mt-[9rem]">
              <div className="w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem] mr-[2rem] bg-[#D9D9D952]/[32%]">
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images jsx-a11y/alt-text
              </div>
            </div>
            <div className="flex w-full justify-start">
              <div className="size-[25px] flex justify-center items-center mt-[2.5rem] mr-[1rem] bg-[#D9D9D952]/[32%] rounded-[50%]">
                <OpenxpSVG className="size-[15px]" />
              </div>
              <div className="w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem]">
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images jsx-a11y/alt-text
              </div>
            </div>
            <div className="flex w-full justify-end">
              <div className="w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem] mr-[2rem] bg-[#D9D9D952]/[32%]">
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images jsx-a11y/alt-text
              </div>
            </div>
            <div className="flex w-full justify-start">
              <div className="size-[25px] flex justify-center items-center mt-[2.5rem] mr-[1rem] bg-[#D9D9D952]/[32%] rounded-[50%]">
                <OpenxpSVG className="size-[15px]" />
              </div>
              <div className="w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem]">
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images jsx-a11y/alt-text
              </div>
            </div>
            <div className="flex w-full justify-end">
              <div className="w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem] mr-[2rem] bg-[#D9D9D952]/[32%]">
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images jsx-a11y/alt-text
              </div>
            </div>
            <div className="flex w-full justify-start">
              <div className="size-[25px] flex justify-center items-center mt-[2.5rem] mr-[1rem] bg-[#D9D9D952]/[32%] rounded-[50%]">
                <OpenxpSVG className="size-[15px]" />
              </div>
              <div className="w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem]">
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images jsx-a11y/alt-text
              </div>
            </div>
          </div>
        </div>
        {this.imputField()}
      </div>
    );
  };

  chatBotSideBar = () => {
    return (
      <div className="fixed max-w-[30rem] h-full w-[23.2rem] bg-white flex flex-col shadow-custom2 z-10 shrink-0">
        {/* Top section */}
        <div className="px-[2rem] pt-[2rem] flex flex-col gap-[3.5rem]">
          <div className="w-full mt-[4rem] flex flex-row gap-[2rem]">
            <div className="flex h-[2.75rem] gap-2 w-fit">
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
                <img src={PencilEdit} alt="New Conversation" />
              </div>
              <div className="font-[600] font-manropes text-[1.5rem] leading-[2.049rem]">
                New Conversation
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="size-[2.35rem]">
                <img src={ChartBar} alt="Grade Analytics" />
              </div>
              <div className="font-[600] font-manropes text-[1.5rem] leading-[2.049rem]">
                Grade Analytics
              </div>
            </div>
          </div>
        </div>
        <div className="font-[600] px-[2rem] pt-[2rem] font-manropes text-[2.25rem] leading-[3.074rem] text-skyblue-secondary">
          History
        </div>
        {/* Scrollable history section */}
        <div className="flex-grow overflow-y-auto px-[2rem]">
          <div className="flex flex-col gap-10">
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
            {/* Add more history items here */}
          </div>
        </div>

        {/* Bottom profile section */}
        <div className="flex flex-row gap-[1rem] px-[2rem] h-[7rem] bg-white items-center w-full">
          <img
            className="size-[3.25rem]"
            src={ProfilePicture}
            alt="profile picture"
          />
          <div className="flex justify-center items-center font-manropes font-[600] text-[2rem] h-[3.25rem]">
            Tunde Alani
          </div>
        </div>
      </div>
    );
  };

  imputField = () => {
    return (
      <div className="w-full flex justify-center bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="w-full max-w-4xl px-4 py-6 ">
          <div className="relative">
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <img src={PaperClip} alt="paper clip" className="w-6 h-6" />
            </button>
            <input
              className="w-full h-16 pl-12 pr-20 bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-skyblue-secondary"
              placeholder="Type your message..."
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-skyblue-secondary rounded-full flex items-center justify-center z-10">
              <ArrowUpIcon className="text-white w-6 h-6" />
            </button>
          </div>
          <div className="text-center mt-4 text-sm text-gray-700">
            Our model is only used to give insights and not final decisions
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="w-full h-full">
        {this.chatBotSideBar()}
        <div className="flex">
          {/* {this.noChat()} */}
          <div className="w-[23.2rem] h-lvh bg-red-400 shrink-0"></div>
          <div className="w-full">
            <div className="h-[90%]">{this.chatStarted()}</div>
            <div className="fixed w-[100%] h-[10%] shrink-0"></div>
          </div>
          {/* {this.imputField()} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  careerBuddyStarted: state.ai.careerBuddyStarted,
  loadingIndividualChatSessions: state.ai.loadingIndividualChatSessions,
  loadingAllChatSessions: state.ai.loadingAllChatSessions,
  individualChatSessions: state.ai.individualChatSessions,
  allChatSessions: state.ai.allChatSessions,
});

const mapDispatchToProps = {
  StartCareerBuddySession,
  FetchIndividualChatSessions,
  FetchAllChatSessions,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(CareerBot)
);
