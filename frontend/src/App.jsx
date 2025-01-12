import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserSignup from "./pages/UserSignup"
import UserLogin from "./pages/UserLogin"
import CaptainLogin from "./pages/CaptainLogin"
import CaptainSignup from "./pages/CaptainSignup"
import Start from "./pages/Start"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import UserLogout from "./pages/UserLogout"
import CaptainLogout from "./pages/CaptainLogout"
import CaptainHome from "./pages/CaptainHome"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/home" element={
        <UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>
      } />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup/>} />
      <Route path="/user-logout" element={<UserProtectWrapper>
        <UserLogout/>
      </UserProtectWrapper>}/>
      <Route path="/captain-logout" element={<CaptainProtectWrapper>
      <CaptainLogout/>
    </CaptainProtectWrapper>}/>
    <Route path="/captain-home" element={
      <CaptainProtectWrapper>
        <CaptainHome/>
      </CaptainProtectWrapper>
    } />
    </Routes>
  )
}

export default App