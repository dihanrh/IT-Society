import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeMenu from "./components/HomeMenu";
import HomeBody from "./components/HomeBody";
import Registration from "./components/Registration";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ApproveUsers from "./components/ApproveUsers";
import StudentDashboard from "./components/StudentDashboard";
import VotingPage  from "./components/VotingPage";
import Test from "./components/test";
import CurrentElections from "./components/CurrentElections";
import ElectionResult from "./components/ElectionResult";
import AddCourseForm from "./components/AddCourseMentoring";
import MentoringClassList from "./components/MentoringClassList";
import ClassRoutine from "./components/ClassRoutine";
import Wings from "./components/Wings";





function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);

    // Simulate student data
    const studentData = {  // sample to test
      name: 'Rakibul Hasan Dihan',
      studentId: '20203038',
      semester: '10',
    };

  return (
    <>
      <Router>
        <div>
          <Header />
     
       
          <HomeMenu isAdminLoggedIn={isAdminLoggedIn} isStudentLoggedIn={isStudentLoggedIn} />
          <Routes>
            <Route path="/" element={<HomeBody />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/approveUsers" element={<ApproveUsers />} />
            <Route path="/votingpage" element={<VotingPage/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/currentElections" element = {<CurrentElections/>} />
            <Route path="/electionResult" element = {<ElectionResult />} /> 
            <Route path="/addCourse" element = {<AddCourseForm/>} />
            <Route path="/mentoringClassList" element = {<MentoringClassList/>} />
            <Route path="/classRoutine" element  = {<ClassRoutine/>} />
            <Route path="/wings" element = {<Wings/>} />
           

            
            // for admin login
            <Route
              path="/login"
              element={<Login setIsAdminLoggedIn={setIsAdminLoggedIn} setIsStudentLoggedIn={setIsStudentLoggedIn}  />}
            />
            // for student login
          
            {isAdminLoggedIn ? (
              <Route path="/adminDashboard" element={<AdminDashboard />} />
            ) : null}


          {isStudentLoggedIn ?
            (<Route
              path="/studentDashboard"
              element={
                <StudentDashboard />
              }
            />) : null }


          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
