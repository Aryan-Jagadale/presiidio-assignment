import Navbar from "./components/Header/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Courses from "./components/Courses/Courses";
import Request from "./components/Request/Request";
import Contact from "./components/Contact/Contact";
import Login from "./components/Auth/Login";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile/Profile";
import ChangePassword from "./components/Profile/ChangePassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import CoursePage from "./components/CoursePage/CoursePage";
import Sidebar from "./components/Header/Sidebar";
import Register from "./components/Auth/Register";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";

import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./components/Loader";

function App() {
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex">
            <Sidebar isAuthenticated={isAuthenticated} user={user} />

            <div className="h-screen flex-1 pt-0 pl-0">
              <Navbar isAuthenticated={isAuthenticated} user={user} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/request" element={<Request />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/course/:id"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <CoursePage user={user} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <Login />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <Register />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/forgetpassword"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <ForgetPassword />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/resetpassword/:token"
                  element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated}
                      redirect="/profile"
                    >
                      <ResetPassword />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/changepassword"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ChangePassword user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Profile user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/updateprofile"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <UpdateProfile user={user} />
                    </ProtectedRoute>
                  }
                />
                {/*AdminRoutes */} 
                <Route
                  path="/admin/createcourse"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <CreateCourse />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminCourses />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <Toaster />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
