import React, { Component } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import WriteIcon from "../../../../icons/write-icon.png";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";

class AddSchedule extends Component {
  state = {
    isDescriptionFocused: false,
    description: "",
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    location: PropTypes.func.isRequired,
  };

  ReturnToSchedule = () => {
    this.props.navigate("/dashboard/schedule-plan");
  };

  handleDescriptionFocus = () => {
    this.setState({ isDescriptionFocused: true });
  };

  handleDescriptionBlur = () => {
    if (this.state.description.trim() === "") {
      this.setState({ isDescriptionFocused: false });
    }
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    const { isDescriptionFocused, description } = this.state;

    const { location } = this.props;
    const HeaderText =
      location.pathname === "/dashboard/schedule-plan/edit"
        ? "Edit Schedule"
        : "Add Schedule";

    const SaveOrUpdate =
      location.pathname === "/dashboard/schedule-plan/edit" ? "Update" : "Save";

    return (
      <div className="flex flex-col w-[95%] font-inter my-4 gap-[3rem] p-8">
        <div className="flex gap-4 items-center">
          <button onClick={this.ReturnToSchedule}>
            <div className="size-[3.5rem]">
              <ArrowLeftIcon />
            </div>
          </button>
          <div className="flex justify-center items-center font-[700] text-[2rem] 2xl:text-[3.375rem]">
            {HeaderText}
          </div>
        </div>
        <div>
          <div className="font-[400] text-[1.5rem]">Event Title</div>
          <input
            className="w-full h-[4rem] border-2 rounded-[0.875rem] text-[1.5rem]"
            type="text"
            placeholder=""
          />
        </div>
        <div>
          <div className="font-[400] text-[1.5rem]">Exam Type</div>
          <input
            className="w-full h-[4.5rem] text-[1.5rem] rounded-[0.875rem]"
            type="text"
            placeholder=""
          />
        </div>
        <div className="flex gap-[2rem] items-center">
          <div>
            <div>Date</div>
            <input
              className="w-[15.125rem] h-[3.813rem] text-[1.5rem] border-2 rounded-[3.813rem]"
              type="date"
              onFocus={this.handleDescriptionFocus}
              onBlur={this.handleDescriptionBlur}
            />
          </div>
          <div className="flex w-[4rem] h-[2rem] items-center mt-[1.8rem]">
            <ArrowLongRightIcon />
          </div>
          <div>
            <div>Time</div>
            <input
              className="w-[12.125rem] h-[3.813rem] text-[1.5rem] border-2 rounded-[3.813rem]"
              type="time"
            />
          </div>
        </div>
        <div className="flex relative">
          {!isDescriptionFocused && description.trim() === "" && (
            <div className="flex items-center absolute p-[1rem] gap-2 -z-10">
              <img
                className="w-[2rem] h-[2rem]"
                src={WriteIcon}
                alt="Write Icon"
              />
              <div className="font-[400] text-[1.5rem]">Add Description</div>
            </div>
          )}
          <input
            className="w-full h-[10rem] border-2 rounded-[0.875rem]"
            placeholder=""
            onFocus={this.handleDescriptionFocus}
            onBlur={this.handleDescriptionBlur}
            onChange={this.handleDescriptionChange}
            value={description}
          />
        </div>
        <div className="flex justify-end">
          <button className="flex justify-center items-center w-[13.375rem] h-[3.438rem] bg-purple-primary rounded-[0.438rem] text-white font-[600] text-lg 2xl:text-[2.25rem] leading-[2.043rem]">
            <div>{SaveOrUpdate}</div>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouterHooks(AddSchedule);
