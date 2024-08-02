import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardContent from "../../components/Dashboard/MainDashHome/DashboardContent";
import SideBar from "./DashBoardSideBar/SideBar";
import DashboardNavBar from "./DashBoardSideBar/DashboardNavBar";
import Void from "./DashBoardSideBar/void";
import MockExam from "../../components/Dashboard/TestandSimulation/MockExams/MockExam";
import Evaluation from "../../components/Dashboard/TestandSimulation/EvaluationScreen/Evaluation";
import SummaryPage from "./TestandSimulation/SummaryPage/SummaryPage";
import SchedulePlan from "./SchedulePlan/SchedulePlan";
import AddSchedule from "./SchedulePlan/ScheduleComponent/AddSchedule";
import _SummaryPage from "./TestandSimulation/SummaryPage/_SummaryPage";
import ShowExplanation from "./TestandSimulation/SummaryPage/ShowExplanation";
import CareerBot from "./CareerBot/CareerBot";

export function DashContent() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <DashboardNavBar />
              <div className="flex">
                <Void />
                <div className="flex w-full justify-center mt-[10rem]">
                  <DashboardContent />
                </div>
              </div>
              <SideBar />
            </div>
          }
        />
        <Route
          path="mock-exam"
          element={
            <div>
              <DashboardNavBar className="-mt" />
              <div className="flex">
                <Void />
                <div className="flex w-full justify-center mt-[10rem]">
                  <MockExam />
                </div>
              </div>
              <SideBar />
            </div>
          }
        />
        <Route
          path="schedule-plan"
          element={
            <div>
              <DashboardNavBar className="-mt" />
              <div className="flex">
                <Void />
                <div className="flex w-full justify-center mt-[10rem]">
                  <SchedulePlan />
                </div>
              </div>
              <SideBar />
            </div>
          }
        />
        <Route
          path="schedule-plan/create"
          element={
            <div>
              <DashboardNavBar className="" />
              <div className="flex">
                <Void />
                <div className="flex w-full justify-center mt-[8rem]">
                  <AddSchedule />
                </div>
              </div>
              <SideBar />
            </div>
          }
        />
        <Route
          path="schedule-plan/edit/:id"
          element={
            <div>
              <DashboardNavBar className="" />
              <div className="flex">
                <Void />
                <div className="flex w-full justify-center mt-[8rem]">
                  <AddSchedule />
                </div>
              </div>
              <SideBar />
            </div>
          }
        />
        <Route path="mock-exam/evaluation/:id" element={<Evaluation />} />
        <Route path="summary" element={<SummaryPage />} />
        <Route path="_summary" element={<_SummaryPage />} />
        <Route path="explanation" element={<ShowExplanation />} />
        <Route path="career-bot" element={<CareerBot />} />
      </Routes>
    </div>
  );
}

export default DashContent;
