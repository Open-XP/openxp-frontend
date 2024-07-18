import React, { Component } from "react";
import AddScheduleButton from "./ScheduleComponent/AddScheduleButton";
import NoSchedule from "./ScheduleComponent/NoSchedule";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { assignColor, daysLeft, formatDate } from "../../../Utils/AutoStyling";
import PropTypes from "prop-types";
import { withRouterHooks } from "../../../withRouters/withRoutersHook";
import ScheduleEditAndDelete from "./ScheduleComponent/ScheduleEditAndDelete";

class SchedulePlan extends Component {
  state = {
    upcomingExams: [
      {
        id: 1,
        name: "Mathematics",
        date: "2024-07-25",
        exam: "waec",
        time: "10:00",
      },
      {
        id: 2,
        name: "Physics",
        date: "2024-09-25",
        exam: "waec",
        time: "12:00",
      },
      {
        id: 3,
        name: "Chemistry",
        date: "2024-08-14",
        exam: "waec",
        time: "14:00",
      },
    ],
    visibility: {},
    loading: true,
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };

  navigateToEdit = () => {
    const { navigate } = this.props;
    navigate("edit");
  };

  toggleVisibility = (id) => {
    this.setState((prevState) => {
      const newVisibility = { ...prevState.visibility };
      newVisibility[id] = !newVisibility[id];
      return { visibility: newVisibility };
    });
  };

  render() {
    const { upcomingExams, visibility } = this.state;

    if (upcomingExams.length === 0) {
      return (
        <div className="flex w-full min-h-screen justify-center">
          <div className="w-4/5 flex flex-col gap-[18rem] mt-[3rem]">
            <div className="flex justify-between mb-4">
              <div className="flex justify-center items-center font-bold text-2xl 2xl:text-[3.375rem]">
                Schedule Exam
              </div>
              <AddScheduleButton />
            </div>
            <NoSchedule />
          </div>
        </div>
      );
    }

    return (
      <div className="w-[90%] font-sans mb-[4rem]">
        <div className="flex justify-between mb-4">
          <div className="flex justify-center items-center font-bold text-2xl 2xl:text-[3.375rem]">
            Schedule Exam
          </div>
          <AddScheduleButton />
        </div>
        <div className="flex flex-col gap-[4rem]">
          {upcomingExams.map((exam) => (
            <div className="flex w-full 2xl:h-[15rem] h-[10rem]" key={exam.id}>
              <div
                className={`flex justify-center items-center text-white flex-wrap w-[10rem] 2xl:w-[15rem] 2xl:h-full h-[100%] rounded-l font-[700] text-[1.5rem] 2xl:text-[3rem] 2xl:leading-[4.086rem] leading-[2.043rem] text-center ${assignColor(
                  exam.date
                )}`}
              >
                <div className="w-[2.9065rem] h-[4.125rem] 2xl:w-[5.813rem] 2xl:h-[8.25rem]">
                  {formatDate(exam.date)}
                </div>
              </div>
              <div className="flex flex-col justify-evenly w-[100%] leading-[1.362rem] text-[1rem] border-t-2 border-r-2 border-b-2 rounded-r-[0.5rem] pl-4 relative">
                <div className="flex flex-row justify-between pr-14">
                  <div className="2xl:text-[2.5rem] text-[1.5rem] font-[600]">
                    {exam.name}
                  </div>
                  <div
                    className={`flex w-fit h-fix px-4 p-2 rounded-[1.688rem] text-[1.5rem] text-white ${assignColor(
                      exam.date
                    )}`}
                  >
                    {daysLeft(exam.date) === 0
                      ? "Today by " + exam.time
                      : daysLeft(exam.date) === 1
                      ? "Tomorrow"
                      : `${daysLeft(exam.date)} days left`}
                  </div>
                </div>
                <div className="flex justify-between pr-14">
                  <div className="font-[700] 2xl:text-[2.5rem] text-[1.5rem]">
                    {exam.exam}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => this.toggleVisibility(exam.id)}>
                      <EllipsisVerticalIcon className="w-[1.5rem] 2xl:w-[2.5rem] h-[1.5rem] 2xl:h-[2.5rem]" />
                    </button>
                    {visibility[exam.id] && (
                      <div className="absolute right-4 -bottom-[3.5rem]">
                        <ScheduleEditAndDelete />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouterHooks(SchedulePlan);
