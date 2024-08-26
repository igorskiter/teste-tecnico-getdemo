import DemoDetail from "@/features/Demo/DemoDetail";
import Demos from "@/features/Demo/Demos";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Demos />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/demos/detail/:frameId" element={<DemoDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
