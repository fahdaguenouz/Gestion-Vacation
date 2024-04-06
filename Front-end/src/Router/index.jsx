// DynamicRouter.jsx

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/login";

import Notfound from "../Pages/Notfound";
import Layout from "../layouts/layout";
import GuestLayout from "../layouts/GuestLayout";
import Personnel from "../Pages/Personnel";
import Budget from "../Pages/budget";
import AjouterPersonnel from "../Pages/Forms/AjouterForm/AjouterPersonnel";
import AjouterBudget from "../Pages/Forms/AjouterForm/AjouterBudget";
import Users from "../Pages/Users";
import AjouterUser from "../Pages/Forms/AjouterForm/AjouterUser";
import UserUpdate from "../Pages/Forms/UpdateForms/UserUpdate";
import Profile from "../Pages/Profile";
import PersonnelUpdate from "../Pages/Forms/UpdateForms/PersonnelUpdate";
import Jury from "../Pages/Jury";
import AjouterJury from "../Pages/Forms/AjouterForm/AjouterJury";

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/personnel',
        element: <Personnel/>
      },
      {
        path: '/budget',
        element: <Budget/>
      },
      
      {
        path:'/Budget/Ajouter-Budget',
        element:<AjouterBudget/>
      },
      {
        path:'/users',
        element:<Users/>
      },
      {
        path:'/users/Ajouter-User',
        element:<AjouterUser/>
      },
      {
        path:'/users/Update-User/:userId',
        element:<UserUpdate/>
      },

      
      {
        path:'/Profile',
        element:<Profile/>
      },
      {
        path:'/jury',
        element:<Jury />
      },{
        path:'//jury/ajouter-jury',
        element:<AjouterJury />
      },
      {
        path: '*',
        element: <Notfound/>
      },
      
    ]
  },
  {
    element: <GuestLayout/>,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '*',
        element: <Notfound/>
      },
    ]
  },
]);

export default router;
