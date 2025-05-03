import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProject from "./pages/AddProject";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/authReducer";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "/add-project",
          element: (
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/project/:id",
      element: (
        <ProtectedRoute>
          <TasksPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
