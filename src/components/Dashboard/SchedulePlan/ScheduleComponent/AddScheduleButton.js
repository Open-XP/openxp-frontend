import React, { Component } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../../withRouters/withRoutersHook";

class AddScheduleButton extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };

  createSchedule = () => {
    this.props.navigate("create");
  };
  render() {
    return (
      <button
        onClick={this.createSchedule}
        className="flex justify-around items-center w-[13.375rem] 2xl:w-[26.75rem] h-[3.438rem] 2xl:h-[6.876rem] bg-purple-primary rounded-[0.438rem] text-white font-medium text-lg 2xl:text-[2.25rem]"
      >
        <div>Add Schedule</div>
        <PlusIcon className="size-[3rem]" />
      </button>
    );
  }
}
export default withRouterHooks(AddScheduleButton);
