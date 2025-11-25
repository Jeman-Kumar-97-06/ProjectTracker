import AuthPage from "./components/AuthPage"
import LandingPage from "./components/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ReportsPage from "./components/ReportsPage"
import TasksPage from "./components/TasksPage"
import CreatorDashboard from "./components/HomePage"
import MemberDashboard from "./components/MembersHome"
import TeamChat from "./components/TeamChat"
function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route exact path='/db' element={<><CreatorDashboard/><MemberDashboard/></>}/>
      <Route exact path='/auth' element={<AuthPage/>}/>
      <Route exact path='/chat' element={<TeamChat/>}/>
      <Route exact path='/reports' element={<ReportsPage/>}/>
      <Route exact path='/tasks' element={<TasksPage/>}/>
    </Routes>
   </BrowserRouter>
   </>   
  )
}

export default App
