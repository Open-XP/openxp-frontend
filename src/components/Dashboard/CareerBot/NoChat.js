import React, { Component } from "react";
import SmileImage from "../../../icons/Smile.png";
import ManSitting from "../../../icons/man-sitting.png";
import PaperClip from "../../../icons/PaperclipHorizontal.png";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import PropTypes from "prop-types";
import { FetchRecommendCareerTopics } from "../../../Actions/AI";
import Loader from "../../../Animations/Loader/loader";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import InputField from "./ChatInputField";
import NoChatTrigger from "../../../Actions/AI";

class NoChat extends Component {
  static propTypes = {
    FetchRecommendCareerTopics: PropTypes.func.isRequired,
    RecommendedCareerTopics: PropTypes.array.isRequired,
    loadingRecommendCareerTopics: PropTypes.bool.isRequired,
    individualChatSessions: PropTypes.object.isRequired,
    noChatTrigger: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { noChatTrigger, NoChatTrigger, FetchRecommendCareerTopics } =
      this.props;
    if (noChatTrigger) {
      NoChatTrigger();
    }
    // FetchRecommendCareerTopics();
  }

  render() {
    const {
      FetchRecommendCareerTopics,
      loadingRecommendCareerTopics,
      RecommendedCareerTopics,
    } = this.props;

    return (
      <div className="w-full h-lvh flex flex-col">
        <div className="w-full flex-grow overflow-y-auto flex-col items-center gap-[5rem] justify-center flex">
          <div className="w-[36.375rem] h-[9.781rem] mt-[5.688rem] flex flex-col items-center gap-[0.625rem]">
            <div className="w-[4.063rem] h-[3.719rem]">
              <img className="w-full" src={SmileImage} alt="smile Image" />
            </div>
            <div className="font-inter font-[700] text-[2rem] leading-[2.421rem] text-[#4169E1]">
              Ask Career Buddy
            </div>
            <div className="font-inter font-[400] text-base leading-[1.21rem] text-center">
              Career Buddy uses your progress in OpenXP to give you clarity on
              career choices and paths.
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
        </div>
        <InputField />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  RecommendedCareerTopics: state.ai.recommendedCareerTopics,
  individualChatSessions: state.ai.individualChatSessions,
  noChatTrigger: state.ai.noChatTrigger,
});

const mapDispatchToProps = {
  FetchRecommendCareerTopics,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(NoChat)
);
