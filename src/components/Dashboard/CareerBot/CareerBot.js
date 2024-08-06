import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import PropTypes from "prop-types";
import Loader from "../../../Animations/Loader/loader.js";
import {
  StartCareerBuddySession,
  FetchIndividualChatSessions,
  FetchAllChatSessions,
  ChatInput,
  FetchRecommendCareerTopics,
} from "../../../Actions/AI.js";
import ChatBotSideBar from "./ChatBotSideBar ";
import ChatStarted from "./ChatStarted";
import NoChat from "./NoChat";

class CareerBot extends Component {
  static propTypes = {
    StartCareerBuddySession: PropTypes.func.isRequired,
    FetchIndividualChatSessions: PropTypes.func.isRequired,
    FetchAllChatSessions: PropTypes.func.isRequired,
    careerBuddyStarted: PropTypes.bool.isRequired,
    loadingIndividualChatSessions: PropTypes.bool.isRequired,
    loadingAllChatSessions: PropTypes.bool.isRequired,
    individualChatSessions: PropTypes.object.isRequired,
    allChatSessions: PropTypes.array.isRequired,
    chatInstanceID: PropTypes.string,
    ChatInput: PropTypes.func.isRequired,
    FetchRecommendCareerTopics: PropTypes.func.isRequired,
    loadingRecommendCareerTopics: PropTypes.bool.isRequired,
    recommendedCareerTopics: PropTypes.array.isRequired,
  };

  state = {
    message: "",
    id: "",
    isWaitingForResponse: false,
  };

  componentDidMount() {
    const {
      FetchAllChatSessions,
      chatInstanceID,
      FetchRecommendCareerTopics,
      loadingRecommendCareerTopics,
    } = this.props;
    FetchAllChatSessions();
    if (chatInstanceID) {
      console.log("Career session Started:", chatInstanceID);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      chatInstanceID,
      FetchIndividualChatSessions,
      FetchAllChatSessions,
      allChatSessions,
      loadingRecommendCareerTopics,
    } = this.props;

    if (prevProps.chatInstanceID !== chatInstanceID) {
      console.log("Chat instance ID changed:", chatInstanceID);
      FetchIndividualChatSessions(chatInstanceID);

      if (!prevProps.chatInstanceID && chatInstanceID) {
        FetchAllChatSessions();
      }
    }

    if (allChatSessions.length > prevProps.allChatSessions.length) {
      FetchAllChatSessions();
    }

    if (!loadingRecommendCareerTopics) {
      console.log(
        "Loading RecommendCareerTopics:",
        loadingRecommendCareerTopics
      );
      FetchRecommendCareerTopics();
    }
  }

  handleCreateNewChatInstance = () => {
    const { StartCareerBuddySession, FetchAllChatSessions } = this.props;
    StartCareerBuddySession().then((newSession) => {
      this.setState({ id: newSession.id });
      FetchAllChatSessions();
    });
  };

  handleContinueChatInstance = (id) => {
    const { FetchIndividualChatSessions } = this.props;
    FetchIndividualChatSessions(id);
    this.setState({ id });
  };

  handleChatInput = (event) => {
    event.preventDefault();
    const {
      ChatInput,
      chatInstanceID,
      FetchIndividualChatSessions,
      StartCareerBuddySession,
    } = this.props;
    const { id, message } = this.state;

    if (message.trim() === "") return;

    this.setState({ isWaitingForResponse: true });

    const sessionId = id || chatInstanceID;

    if (sessionId) {
      ChatInput(sessionId, message)
        .then(() => {
          return FetchIndividualChatSessions(sessionId);
        })
        .finally(() => {
          this.setState({ isWaitingForResponse: false, message: "" });
        });
    } else {
      StartCareerBuddySession().then((newSession) => {
        const newSessionId = newSession.id;
        this.setState({ id: newSessionId });
        return ChatInput(newSessionId, message)
          .then(() => {
            return FetchIndividualChatSessions(newSessionId);
          })
          .finally(() => {
            this.setState({
              isWaitingForResponse: false,
              message: "",
              id: newSessionId,
            });
          });
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleChatInput(event);
    }
  };

  handleSuggestedChatClick = (suggestedMessage) => {
    this.setState({ message: suggestedMessage }, () => {
      this.handleChatInput(new Event("submit"));
    });
  };

  centeredLoader = () => (
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  );

  render() {
    const {
      loadingAllChatSessions,
      loadingIndividualChatSessions,
      careerBuddyStarted,
    } = this.props;

    if (loadingAllChatSessions) {
      return (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader className="p-[25%]" />
        </div>
      );
    }

    return (
      <div className="w-full h-full">
        <ChatBotSideBar />
        <div className="flex">
          <div className="w-[23.2rem] h-lvh shrink-0"></div>
          <div className="w-full">
            <div className="h-[90%]">
              {loadingIndividualChatSessions && !careerBuddyStarted ? (
                <NoChat />
              ) : (
                <ChatStarted />
              )}
            </div>
            <div className="fixed w-[100%] h-[10%] shrink-0"></div>
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
});

const mapDispatchToProps = {
  StartCareerBuddySession,
  FetchIndividualChatSessions,
  FetchAllChatSessions,
  ChatInput,
  FetchRecommendCareerTopics,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(CareerBot)
);
