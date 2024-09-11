import react, { Component } from "react";
import MagnifyingLenseSVG from "../../../../svgs/MagnifyingLenseSVG.svg";
import NotificationBellSVG from "../../../../svgs/NotificationBellSVG.svg";
import OpenxpSVG from "../../../../svgs/openxp";

class PersonalLearningNavbar extends Component {
  render() {
    return (
      <div>
        <div className="w-full h-[5.25rem]">
          <div className="fixed w-full h-[5.25rem] px-[4.5%] flex justify-between shadow-custom items-center z-10 bg-white">
            <div className="flex h-[2.063rem] items-center gap-[0.813rem]">
              <OpenxpSVG className="w-[1.813rem] h-full text-purple-primary" />
              <div className="font-sans h-full font-[700] text-[1.25rem]">
                Openxp
              </div>
            </div>
            <div className="flex h-[2rem] gap-[2.063rem]">
              <img
                className="size-[2rem]"
                src={MagnifyingLenseSVG}
                alt="Search"
              />
              <img
                className="size-[2rem]"
                src={NotificationBellSVG}
                alt="Notifications"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalLearningNavbar;
