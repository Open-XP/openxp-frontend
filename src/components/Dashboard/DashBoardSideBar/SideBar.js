import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../../Actions/Auth";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import {
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  LockClosedIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { connect } from "react-redux";
import HomeSVG from "../../../svgs/HomeSVG.svg";
import TestAndSimulationSVG from "../../../svgs/TestAndSimulationSVG.svg";
import PersonalLearningSVG from "../../../svgs/PersonalLearningSVG.svg";
import CareerBuddySVG from "../../../svgs/CareerBuddySVG.svg";
import ResourcesSVG from "../../../svgs/ResourcesSVG.svg";
import StudyPlannerSVG from "../../../svgs/SchedulePlanSVG.svg";
import CommunitySVG from "../../../svgs/CommunitySVG.svg";
import ResultsAnalyticsSVG from "../../../svgs/ResultsAnalysisSVG.svg";
import StudyWarSVG from "../../../svgs/StudyWarSVG.svg";
import LeaderBoardSVG from "../../../svgs/LeaderBoardsSVG.svg";
import SettingSVG from "../../../svgs/SettingSVG.svg";

class SideBar extends Component {
  state = {
    activeIndex: null, // To track which item is active
  };

  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    navigate: PropTypes.func.isRequired,
  };

  // Handle logout
  handleLogout = () => {
    this.props.logout();
  };

  // Handle accordion toggle
  handleToggle = (index, title) => {
    if (title === "Logout") {
      this.handleLogout();
    } else {
      // Toggle active index
      this.setState((prevState) => ({
        activeIndex: prevState.activeIndex === index ? null : index,
      }));
    }
  };

  // Accordion data
  accordionData = [
    {
      id: 1,
      title: "Home",
      Icon: HomeSVG,
      isImage: true,
      Arrow: "none",
      link: "/dashboard",
    },
    {
      id: 2,
      title: "Test and Simulation",
      subtitle: [
        { name: "Mock Test", link: "/dashboard/mock-exam" },
        { name: "Exam Drill", link: "/exam-drill" },
      ],
      Icon: TestAndSimulationSVG,
      isImage: true,
      Arrow: ChevronDownIcon,
      rotate: true,
    },
    {
      id: 3,
      title: "Personal Tutor",
      Icon: PersonalLearningSVG,
      isImage: true,
      Arrow: "none",
      rotate: false,
      link: "/dashboard/personal-tutor",
    },
    {
      id: 4,
      title: "Career Buddy",
      Icon: CareerBuddySVG,
      isImage: true,
      Arrow: "none",
      rotate: false,
      link: "/dashboard/career-bot",
    },
    {
      id: 5,
      title: "Resources",
      Icon: ResourcesSVG,
      isImage: true,
      Arrow: LockClosedIcon,
      rotate: true,
      link: "",
    },
    {
      id: 6,
      title: "Schedule Plans",
      Icon: StudyPlannerSVG,
      isImage: true,
      Arrow: "none",
      rotate: true,
      link: "/dashboard/schedule-plan",
    },
    {
      id: 7,
      title: "Community",
      Icon: CommunitySVG,
      isImage: true,
      Arrow: LockClosedIcon,
      rotate: true,
      link: "",
    },
    {
      id: 8,
      title: "Results Analytics",
      Icon: ResultsAnalyticsSVG,
      isImage: true,
      Arrow: LockClosedIcon,
      rotate: true,
      link: "",
    },
    {
      id: 9,
      title: "Study Wars",
      Icon: StudyWarSVG,
      isImage: true,
      Arrow: LockClosedIcon,
      rotate: false,
      link: "",
    },
    {
      id: 10,
      title: "Leaderboards",
      Icon: LeaderBoardSVG,
      isImage: true,
      Arrow: "none",
      rotate: false,
      link: "",
    },
    {
      id: 11,
      title: "Settings",
      Icon: SettingSVG,
      isImage: true,
      Arrow: "none",
      rotate: true,
      link: "",
    },
    {
      id: 12,
      title: "Logout",
      Icon: PowerIcon,
      Arrow: "none",
      rotate: true,
      link: "",
    },
  ];

  render() {
    const { activeIndex } = this.state;

    return (
      <div className="fixed flex flex-col gap-10 top-32 h-full w-full max-w-[30rem] p-4 shadow-xl overflow-x-auto">
        <div className="flex flex-col h-fit relative ">
          {this.accordionData.map(
            ({ id, title, subtitle, Icon, isImage, Arrow, rotate, link }) => (
              <List key={id}>
                <Accordion open={activeIndex === id}>
                  <ListItem className="flex flex-col">
                    <AccordionHeader
                      // Handle the toggle for all headers
                      onClick={() => this.handleToggle(id, title)}
                      className={`border-b-0 p-3 flex justify-between items-center w-full ${
                        activeIndex === id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Check if there's a link */}
                        {link ? (
                          <Link
                            to={link}
                            className={`flex items-center gap-2 no-underline ${
                              activeIndex === id ? "text-white" : "text-black"
                            }`}
                          >
                            <ListItemPrefix>
                              {isImage ? (
                                <img
                                  src={Icon}
                                  alt={title}
                                  className={`h-8 w-8 ${
                                    activeIndex === id ? "filter invert" : ""
                                  }`} // invert color of the SVG when active
                                />
                              ) : (
                                <Icon
                                  className={`h-8 w-8 ${
                                    activeIndex === id
                                      ? "text-white"
                                      : "text-black"
                                  }`}
                                />
                              )}
                            </ListItemPrefix>
                            <span className="font-bold text-lg">{title}</span>
                          </Link>
                        ) : (
                          // Render if there's no link
                          <>
                            <ListItemPrefix>
                              {isImage ? (
                                <img
                                  src={Icon}
                                  alt={title}
                                  className={`h-8 w-8 ${
                                    activeIndex === id ? "filter invert" : ""
                                  }`} // invert color of the SVG when active
                                />
                              ) : (
                                <Icon
                                  className={`h-5 w-5 ${
                                    activeIndex === id
                                      ? "text-white"
                                      : "text-black"
                                  }`}
                                />
                              )}
                            </ListItemPrefix>
                            <span
                              className={`font-bold text-lg ${
                                activeIndex === id ? "text-white" : "text-black"
                              }`}
                            >
                              {title}
                            </span>
                          </>
                        )}
                      </div>
                      {/* Show the arrow icon and rotate if active */}
                      {Arrow !== "none" && (
                        <Arrow
                          strokeWidth={2.5}
                          className={`h-4 w-4 transition-transform ${
                            activeIndex === id && rotate ? "rotate-180" : ""
                          }`}
                          style={{ marginLeft: "auto" }}
                        />
                      )}
                    </AccordionHeader>
                  </ListItem>

                  {/* Render the AccordionBody if there are subtitles */}
                  {subtitle && (
                    <AccordionBody className="flex flex-col items-start ml-[5rem] p-0">
                      <List>
                        {subtitle.map((sub, index) => (
                          <ListItem key={index}>
                            <Link
                              to={sub.link}
                              className="text-xl no-underline text-black"
                            >
                              {sub.name}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionBody>
                  )}
                </Accordion>
              </List>
            )
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth?.isAuthenticated,
  error: state.error,
  logout: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
};

export default withRouterHooks(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
