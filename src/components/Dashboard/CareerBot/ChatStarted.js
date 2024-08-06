import React, { Component, createRef } from "react";
import OpenxpSVG from "../../../svgs/openxp.js";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../withRouters/withRoutersHook.js";
import PropTypes from "prop-types";
import {
  StartCareerBuddySession,
  FetchAllChatSessions,
  FetchIndividualChatSessions,
  ChatInput,
} from "../../../Actions/AI.js";
import Loader from "../../../Animations/Loader/loader.js";
import InputField from "./ChatInputField.js";

class ChatStarted extends Component {
  static propTypes = {
    FetchIndividualChatSessions: PropTypes.func.isRequired,
    chatInstanceID: PropTypes.string,
    individualChatSessions: PropTypes.object.isRequired,
    loadingIndividualChatSessions: PropTypes.bool.isRequired,
    UpdatedInstanceID: PropTypes.string,
    careerBuddyStarted: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.chatContainerRef = createRef();
    this.lastMessageRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const {
      FetchIndividualChatSessions,
      chatInstanceID,
      individualChatSessions,
      UpdatedInstanceID,
      careerBuddyStarted,
    } = this.props;
    if (
      prevProps.loadingIndividualChatSessions !==
      this.props.loadingIndividualChatSessions
    ) {
      FetchIndividualChatSessions(individualChatSessions.id);
    }
    if (prevProps.individualChatSessions !== individualChatSessions) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    if (this.lastMessageRef.current) {
      this.lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  centeredLoader = () => (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  );

  render() {
    const { individualChatSessions, loadingIndividualChatSessions } =
      this.props;
    return (
      <div className="w-full h-lvh flex flex-col">
        <div
          className="flex-grow overflow-y-auto custom-scrollbar pr-4"
          ref={this.chatContainerRef}
        >
          {loadingIndividualChatSessions ? (
            this.centeredLoader()
          ) : (
            <div className="w-full flex flex-col gap-[1rem] px-4 py-8">
              {individualChatSessions &&
              Array.isArray(individualChatSessions.messages) &&
              individualChatSessions.messages.length > 0 ? (
                individualChatSessions.messages.map((message, index) => (
                  <div
                    key={index}
                    ref={
                      index === individualChatSessions.messages.length - 1
                        ? this.lastMessageRef
                        : null
                    }
                    className={`flex w-full ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`w-fit h-fit py-[2rem] px-[2rem] rounded-[61px] max-w-[40rem] flex flex-row justify-center items-center ${
                        message.role === "user"
                          ? "bg-[#D9D9D952]/[32%] mr-[rem]"
                          : ""
                      }`}
                    >
                      {message.role !== "user" && (
                        <div className="size-[25px] flex justify-center items-center mr-[1rem] bg-[#D9D9D952]/[32%] rounded-[50%]">
                          <OpenxpSVG className="size-[15px]" />
                        </div>
                      )}
                      <div>{message.content}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p>Start a new conversation or select an existing one.</p>
                </div>
              )}
            </div>
          )}
        </div>
        <InputField />
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
  UpdatedInstanceID: state.ai.UpdatedInstanceID,
  careerBuddyStarted: state.ai.careerBuddyStarted,
});

const mapDispatchToProps = {
  StartCareerBuddySession,
  FetchAllChatSessions,
  FetchIndividualChatSessions,
  ChatInput,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(ChatStarted)
);
