import { Route, Routes } from "react-router-dom";

import { AllTask } from "../pages/AllTask";
import CreateTask from "../pages/CreateTask";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllTask />}></Route>
        <Route path="/createtask" element={<CreateTask />}></Route>
      </Routes>
    </div>
  );
};

export default MainRoutes;
