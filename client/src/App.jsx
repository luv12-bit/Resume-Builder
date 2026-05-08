import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import ATSScore from "./pages/ATSScore";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./app/features/authSlice";
import api from "./configs/api";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const { data } = await api.get("/api/users/data", {
            headers: { Authorization: token }
          });

          if (data.user) {
            dispatch(login({ token, user: data.user }));
          }
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error.message);
      }
    };
    getUserData();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="ats-score" element={<ATSScore />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
