import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MainPage from "./page/Main";
import LoginPage from "./page/Login";
import AdminDashboard from "./page/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
