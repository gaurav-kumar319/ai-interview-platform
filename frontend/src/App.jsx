import { Routes, Route, Navigate } from "react-router-dom";


// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";


// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import InterviewHistory from "./pages/InterviewHistory";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Interview from "./pages/Interview";
import Report from "./pages/Report";


// Layout & Protection
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";




function App() {


  return (

    <Routes>



      {/* ================= PUBLIC ROUTES ================= */}


      <Route

        path="/"

        element={<Login />}

      />



      <Route

        path="/login"

        element={<Login />}

      />



      <Route

        path="/register"

        element={<Register />}

      />





      {/* ================= PROTECTED ROUTES ================= */}


      <Route


        element={

          <ProtectedRoute>

            <DashboardLayout />

          </ProtectedRoute>

        }


      >




        <Route

          path="/dashboard"

          element={<Dashboard />}

        />





        <Route

          path="/history"

          element={<InterviewHistory />}

        />





        <Route

          path="/analytics"

          element={<Analytics />}

        />





        <Route

          path="/profile"

          element={<Profile />}

        />





        {/* Interview Page */}

        <Route

          path="/interview/:id"

          element={<Interview />}

        />





        {/* AI Feedback Report */}

        <Route

          path="/report/:id"

          element={<Report />}

        />





      </Route>






      {/* ================= INVALID URL ================= */}



      <Route

        path="*"

        element={

          <Navigate to="/dashboard" />

        }

      />





    </Routes>


  );

}



export default App;