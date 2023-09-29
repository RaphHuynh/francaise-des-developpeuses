import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./components/Home"
import Profil from "./components/Profil"
import Portfolio from "./components/Portfolio"
import Portfolios from "./components/Portfolios"
import Connexion from "./components/Connexion"
import Deconnexion from "./components/Deconnexion"
import NavBar from "./components/NavBar";
import FromProfil from "./components/FormProfil";
import FromCategory from "./components/FormCategory";
import FromNetwork from "./components/FormNetwork";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/portfolios",
    element: <Portfolios/>,
  },
  {
    path: "/profil/:profil",
    element: <Profil/>,
  },
  {
    path: "/portfolios/:portfolio",
    element: <Portfolio/>,
  },
  {
    path: "/connexion",
    element: <Connexion/>,
  },
  {
    path: "/deconnexion",
    element: <Deconnexion/>,
  },
  {
    path:"/profil/:profil/edit",
    element: <FromProfil/>
  },
  {
    path:"/profil/:profil/edit/network",
    element: <FromNetwork/>
  },
  {
    path:"/profil/:profil/edit/category",
    element: <FromCategory/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);
