import React, { Component } from "react";
import { Link } from "react-router-dom";
import CloseButton from "../../../icons/closeIcon.png";
import ChartBar from "../../../icons/ChartBar.png";
import OpenxpSVG from "../../../svgs/openxp.js";
import PencilEdit from "../../../icons/PencilSimpleLine.png";
import ProfilePicture from "../../../icons/profile-picture.png";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import PropTypes from "prop-types";
import {
  StartCareerBuddySession,
  FetchAllChatSessions,
  FetchIndividualChatSessions,
  setChatInstanceID,
} from "../../../Actions/AI.js";

class ChatBotSideBar extends Component {
  static propTypes = {
    StartCareerBuddySession: PropTypes.func.isRequired,
    FetchAllChatSessions: PropTypes.func.isRequired,
    FetchIndividualChatSessions: PropTypes.func.isRequired,
    setChatInstanceID: PropTypes.func.isRequired,
    allChatSessions: PropTypes.array.isRequired,
    chatInstanceID: PropTypes.string,
    individualSessionID: PropTypes.string,
    UpdatedInstanceID: PropTypes.string,
  };

  handleContinueChatInstance = (id) => {
    const { FetchIndividualChatSessions, setChatInstanceID } = this.props;
    if (id !== null && id !== undefined) {
      FetchIndividualChatSessions(id);
      setChatInstanceID(id);
      console.log("Investigaing ID", id);
    }
  };

  handleCreateNewChatInstance = () => {
    const {
      StartCareerBuddySession,
      FetchAllChatSessions,
      setChatInstanceID,
      chatInstanceID,
    } = this.props;

    StartCareerBuddySession();
    if (chatInstanceID) {
      FetchAllChatSessions();
    }
  };

  render() {
    const { allChatSessions } = this.props;
    return (
      <div className="fixed max-w-[30rem] h-full w-[23.2rem] bg-white flex flex-col shadow-custom2 z-10 shrink-0">
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
            <button
              onClick={this.handleCreateNewChatInstance}
              className="flex gap-3 items-center"
            >
              <div className="size-[2.35rem]">
                <img src={PencilEdit} alt="New Conversation" />
              </div>
              <div className="font-[600] font-manropes text-[1.5rem] leading-[2.049rem]">
                New Conversation
              </div>
            </button>
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
        <div className="flex-grow overflow-y-auto px-[2rem] custom-scrollbar">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col">
              <div className="font-[400] text-[1rem] leading-[1.366rem] text-[#3C3C3C]">
                Today
              </div>
              <div className="font-[500] font-manropes text-[1.25rem] leading-[1.708rem] flex flex-col gap-[0.8rem] ">
                {allChatSessions.map((session) => (
                  <button
                    onClick={() => this.handleContinueChatInstance(session.id)}
                    className="flex flex-col"
                    key={session.id}
                  >
                    {session.messages.length > 0 ? (
                      <p>{session.messages[0].content.slice(0, 20)}</p>
                    ) : (
                      <p>No messages for this session.</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-[400] text-[1rem] leading-[1.366rem] text-[#3C3C3C]">
                Yesterday
              </div>
            </div>
          </div>
        </div>
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
  }
}

const mapStateToProps = (state) => ({
  careerBuddyStarted: state.ai.careerBuddyStarted,
  loadingIndividualChatSessions: state.ai.loadingIndividualChatSessions,
  loadingAllChatSessions: state.ai.loadingAllChatSessions,
  individualChatSessions: state.ai.individualChatSessions,
  allChatSessions: state.ai.allChatSessions,
  chatInstanceID: state.ai.chatInstanceID,
  recommendedCareerTopics: state.ai.recommendedCareerTopics,
  loadingRecommendCareerTopics: state.ai.loadingRecommendCareerTopics,
  individualSessionID: state.ai.individualSessionID,
});

const mapDispatchToProps = {
  StartCareerBuddySession,
  FetchAllChatSessions,
  FetchIndividualChatSessions,
  // ChatInput,
  setChatInstanceID,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(ChatBotSideBar)
);
