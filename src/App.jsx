import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import AddExam from "./components/AddExam";
import Admin from "./components/Admin";
import ViewTopics from "./components/ViewTopics";
import AddTopic from "./components/AddTopic";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/add-exam" element={<AddExam/>} />
      <Route path="/add-exam/:id" element={<AddExam/>} />
      <Route path="/admin/view-exam-topic/:id/:value/:noq" element={<ViewTopics/>} />
      <Route path="/admin/view-exam-topic/add-topic/:id/:value/:noq" element={<AddTopic/>} />
      <Route path="/admin/view-exam-topic/edit-topic/:id/:value/:noq/:tId" element={<AddTopic/>} />
      <Route path="/admin/view-exam-topic/view-question/:id/:value/:noq/:tId" element={<ViewQuestion/>} />
      <Route path="/admin/view-exam-topic/add-question/:id/:value/:noq/:tId" element={<AddQuestion/>} />
      <Route path="/admin/view-exam-topic/edit-question/:id/:value/:noq/:tId/:qId" element={<AddQuestion/>} />

      </Routes>
    </div>
  );
};
export default App;
