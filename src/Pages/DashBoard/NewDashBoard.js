import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "../../components/DashBoardSideBar/SideBar";
import DashboardNavBar from "../../components/DashBoardSideBar/DashboardNavBar";
import DashboardContent from "../../components/DashContent/DashboardContent/DashboardContent";
import Void from "../../components/DashContent/DashboardContent/void";
import MockExam from "../../components/Dashboard/MockExams/MockExam";
import Evaluation from "../../components/Dashboard/EvaluationScreen/Evaluation";

const NewDashBoard = () => {
  const location = useLocation();

  // Check if the current path includes "evaluation"
  const isEvaluationRoute = location.pathname.includes("evaluation");

  return (
    <div className="m-0">
      {!isEvaluationRoute && <DashboardNavBar />}
      <div className="flex w-screen h-full pt-40 gap-3">
        {!isEvaluationRoute && <Void />}
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="mock-exam" element={<MockExam />} />
            <Route path="evaluation" element={<Evaluation />} />
            {/* Add more dashboard specific routes here */}
          </Routes>
        </div>
      </div>
      {!isEvaluationRoute && <SideBar />}
    </div>
  );
};

export default NewDashBoard;
