import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Summary from "./pages/Summary";
import Upload from "./pages/Upload";
import Home from './pages/Dashboard/Home'
import Profile from "./pages/Profile";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
       <Route path="/" element={<Root/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
             <Route path="/upload" element={<Upload />} />
             <Route path="/dashboard" exact element={<Home/>}/>
                <Route path="/summary/:id" element={<Summary />} />
                <Route path="/summary" element={<Summary />} />
<Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>

   <Toaster 
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px",
      },
    }}
    />
    </UserProvider>
  );
}

export default App;


const Root=()=>{

  const isAuthenticated=!!localStorage.getItem("token")

  return isAuthenticated ? (
    <Navigate to="/profile"/>
  ) : (
    <Navigate to="/login"/>
  )
}