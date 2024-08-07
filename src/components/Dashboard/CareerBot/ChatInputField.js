import React, { Component } from "react";
import PaperClip from "../../../icons/PaperclipHorizontal.png";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import PropTypes from "prop-types";
import HourGlass from "../../../Animations/HourGlass/HourGlass";
import {
  ChatInput,
  StartCareerBuddySession,
  FetchIndividualChatSessions,
  FetchAllChatSessions,
  TriggerIndividualChatSessionsReload,
} from "../../../Actions/AI.js";
import { all } from "axios";

class InputField extends Component {
  static propTypes = {
    ChatInput: PropTypes.func.isRequired,
    chatInstanceID: PropTypes.string,
    TriggerIndividualChatSessionsReload: PropTypes.func.isRequired,
    loadingIndividualChatSessions: PropTypes.bool.isRequired,
    careerBuddyStarted: PropTypes.bool.isRequired,
    UpdatedInstanceID: PropTypes.string,
    careerBuddyStarted: PropTypes.bool.isRequired,
    individualChatSessions: PropTypes.object.isRequired,
    allChatSessions: PropTypes.array.isRequired,
    noChatTrigger: PropTypes.bool.isRequired,
    StartCareerBuddySession: PropTypes.func.isRequired,
  };

  state = {
    message: "",
    isWaitingForResponse: false,
    error: null,
  };

  handleChatInput = (event) => {
    event.preventDefault();
    const {
      ChatInput,
      chatInstanceID,
      TriggerIndividualChatSessionsReload,
      UpdatedInstanceID,
      careerBuddyStarted,
      individualChatSessions,
      allChatSessions,
      noChatTrigger,
      loadingIndividualChatSessions,
      StartCareerBuddySession, // Ensure this is included
    } = this.props;
    const { message } = this.state;

    if (message.trim() === "") return;

    this.setState({ isWaitingForResponse: true, error: null });
    let session = "";

    if (loadingIndividualChatSessions && !careerBuddyStarted) {
      StartCareerBuddySession()
        .then((newSession) => {
          session = newSession.id;
          return ChatInput(session, message);
        })
        .then(() => {
          this.setState({ message: "" });
          TriggerIndividualChatSessionsReload();
        })
        .catch((error) => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isWaitingForResponse: false });
        });
    } else {
      ChatInput(individualChatSessions.id, message)
        .then(() => {
          this.setState({ message: "" });
          TriggerIndividualChatSessionsReload();
        })
        .catch((error) => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isWaitingForResponse: false });
        });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleChatInput(event);
    }
  };

  render() {
    const { message, isWaitingForResponse, error } = this.state;
    const { loadingIndividualChatSessions, chatInstanceID } = this.props;

    return (
      <div className="w-full flex justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50 relative">
        <div className="w-full max-w-4xl px-4 py-6">
          <div className="relative">
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60"
              disabled={isWaitingForResponse}
            >
              <img src={PaperClip} alt="paper clip" className="w-6 h-6" />
            </button>
            <input
              className="w-full h-16 pl-12 pr-20 bg-transparent border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-skyblue-secondary z-40 relative"
              placeholder="Type your message..."
              name="message"
              value={message}
              onChange={this.onChange}
              onKeyDown={this.handleKeyDown}
              disabled={isWaitingForResponse}
              autoComplete="off"
            />
            {isWaitingForResponse ? (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-50">
                <HourGlass className="w-8 h-8 text-skyblue-secondary animate-spin" />
              </div>
            ) : (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-skyblue-secondary rounded-full flex items-center justify-center z-50"
                onClick={this.handleChatInput}
                disabled={
                  isWaitingForResponse ||
                  message.trim() === "" ||
                  !chatInstanceID
                }
              >
                <ArrowUpIcon className="text-white w-6 h-6" />
              </button>
            )}
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="text-center mt-4 text-sm text-gray-700">
            Our model is only used to give insights and not final decisions
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
  individualSessionID: state.ai.chatInstanceID,
  UpdatedInstanceID: state.ai.UpdatedInstanceID,
  noChatTrigger: state.ai.noChatTrigger,
});

const mapDispatchToProps = {
  StartCareerBuddySession,
  FetchAllChatSessions,
  FetchIndividualChatSessions,
  ChatInput,
  TriggerIndividualChatSessionsReload,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(InputField)
);
