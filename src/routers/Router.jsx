import Dashboard from "@/layouts/Dashboard"
import Main from "@/layouts/Main"
import Login from "@/pages/Auth/Login/Login"
import Register from "@/pages/Auth/Register/Register"
import Settings from "@/pages/Settings/Settings"
import TodoList from "@/pages/TodoList/TodoList"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/auth/login",
            element: <Login />
         },
         {
            path: "/auth/register",
            element: <Register />
         }
      ]
   },
   {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
         {
            path: "/dashboard",
            element: <TodoList />
         },
         {
            path: "/dashboard/settings",
            element: <Settings />
         }
      ]
   }

])
