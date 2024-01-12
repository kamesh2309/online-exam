import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import AddExam from "./components/AddExam";
import Admin from "./components/Admin";
import ViewTopics from "./components/ViewTopics";
import AddTopic from "./components/AddTopic";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
import Question from "./components/Question";
import UserExamMapping from "./components/UserExamMapping";
import Registers from "./components/Registers";
import ViewExamUser from "./components/ViewExamUser";
import ExamUserDetails from "./components/ExamUserDetails";
import UserPage from "./components/userModule/UserPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registers" element={<Registers />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user/:uId" element={<UserPage />}/>
        <Route path="/admin/user-exam-mapping" element={<UserExamMapping />} />
        <Route path="/admin/view-exam-topic/user-exam-mapping/:id/:value/:noq" element={<UserExamMapping />} />
        <Route path="/add-exam" element={<AddExam />} />
        <Route path="/edit-exam/:id/:fD" element={<AddExam />} />
        <Route path="/admin/view-exam-topic/:id/:value/:noq" element={<ViewTopics />} />
        <Route path="/admin/view-exam-topic/view-exam-user/:id/:value/:noq" element={<ViewExamUser />} />
        {/* <Route path="/admin/view-exam-topic/view-exam-user/edit-user-exam-mapping/:id/:value/:noq/:pId" element={<UserExamMapping />} /> */}
        <Route path="/admin/view-exam-topic/view-exam-user/view-user-exam-details/:id/:value/:noq/:pId/:fName/:lName" element={<ExamUserDetails />} />
        <Route path="/admin/view-exam-topic/add-topic/:id/:value/:noq" element={<AddTopic />} />
        <Route path="/admin/view-exam-topic/edit-topic/:id/:value/:noq/:tId" element={<AddTopic />} />
        <Route path="/admin/view-exam-topic/view-question/:id/:value/:noq/:tId" element={<ViewQuestion />} />
        <Route path="/admin/view-exam-topic/add-question/:id/:value/:noq/:tId" element={<AddQuestion />} />
        <Route path="/admin/view-exam-topic/edit-question/:id/:value/:noq/:tId/:qId/:fD" element={<AddQuestion />} />
        <Route path="/admin/view-exam-topic/question/:id/:value/:noq/:tId/:qId" element={<Question />} />

      </Routes>
    </>
  );
};
export default App;
