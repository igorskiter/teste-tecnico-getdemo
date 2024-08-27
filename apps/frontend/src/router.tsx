import DemoDetail from "@/features/Demo/DemoDetail";
import Demos from "@/features/Demo/Demos";
import SelectDemoMessage from "@/features/Demo/Demos/SelectDemoMessage";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/demos" element={<Demos />}>
          <Route index element={<SelectDemoMessage />} />
          <Route path="detail/:demoId" element={<DemoDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/demos" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
