import React, { Component } from "react";
import { render } from "@testing-library/react";
import AddSchedule from "./ScheduleComponent/AddSchedule";
import NoSchedule from "./ScheduleComponent/NoSchedule";
import { assignColor, daysLeft, formatDate } from "../../../Utils/AutoStyling";

class SchedulePlan extends Component {
  state = {
    upcomingExams: [
      {
        id: 1,
        name: "Mathematics",
        date: "2024-07-25",
        exam: "waec",
      },
      {
        id: 2,
        name: "Physics",
        date: "2024-09-25",
        exam: "waec",
      },
      {
        id: 3,
        name: "Chemistry",
        date: "2024-07-15",
        exam: "waec",
      },
    ],
    loading: true,
  };

  render() {
    const { upcomingExams } = this.state;

    if (upcomingExams.length === 0) {
      return (
        <div className="flex w-full min-h-screen justify-center">
          <div className="w-4/5 flex flex-col gap-[18rem] mt-[3rem]">
            <div className="flex justify-between mb-4">
              <div className="flex justify-center items-center font-bold text-2xl 2xl:text-[3.375rem]">
                Schedule Exam
              </div>
              <AddSchedule />
            </div>
            <NoSchedule />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between mb-4">
          <div className="flex justify-center items-center font-bold text-2xl 2xl:text-[3.375rem]">
            Schedule Exam
          </div>
          <AddSchedule />
        </div>
        <div className="flex 2xl:flex-row flex-col gap-4">
          {upcomingExams.map((exam) => (
            <div
              className="flex 2xl:w-[22.938rem] w-[54rem] 2xl:h-[5.813rem] h-[10rem]"
              key={exam.id}
            >
              <div
                className={`flex justify-center items-center text-white flex-wrap w-[10rem] 2xl:w-[6.813rem] 2xl:h-[5.813rem] h-[100%] rounded-l font-[700] text-[1.5rem] leading-[2.043rem] ${assignColor(
                  exam.date
                )}`}
              >
                <div className="w-[2.813rem] h-[4.125rem]">
                  {formatDate(exam.date)}
                </div>
              </div>
              <div className="flex flex-col justify-evenly w-[100%] leading-[1.362rem] text-[1rem] border-t-2 border-r-2 border-b-2 rounded-r-[0.5rem] pl-4 relative">
                <div>{exam.name}</div>
                <div className="font-[700]">{exam.exam}</div>
                <div
                  className={`flex w-fit px-2 rounded-[1.688rem] text-white absolute right-4 bottom-4 ${assignColor(
                    exam.date
                  )}`}
                >
                  {daysLeft(exam.date) === 0
                    ? "Today"
                    : daysLeft(exam.date) === 1
                    ? "Tomorrow"
                    : `${daysLeft(exam.date)} days left`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SchedulePlan;
