import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ViewVacancies from "views/Admin/ViewVacancies.js";
import UpdateVacancy from "views/Admin/UpdateVacancy.js";
import CreateVacancy from "views/Admin/CreateVacancy.js";
import AdminLogin from "views/Admin/AdminLogin";

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },

  // added by pawan
  {
    path: "/vacancies",
    name: "Vacancies",
    icon: "ni ni-notification-70 text-pink",
    component: ViewVacancies,
    layout: "/admin",
  },
  {
    path: "/update-vacancy/:id",
    name: "Update Vacancy",
    icon: "ni ni-ruler-pencil text-pink",
    component: UpdateVacancy,
    layout: "/admin",
  },
  {
    path: "/admin-login",
    name: "Admin/ Staff Login",
    icon: "ni ni-circle-08 text-green",
    component: AdminLogin,
    layout: "/auth",
  },

  // nisal
  {
    path: "/create-vacancy",
    name: "Create Vacancy",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: CreateVacancy,
    layout: "/admin",
  },
];
export default routes;
