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
import CreateTechnician from "views/Admin/CreateTechnician.js";
import ViewTechnicians from "views/Admin/ViewTechnicians.js";
import UpdateTechnician from "views/Admin/UpdateTechnician.js";
import AdminLogin from "views/Admin/AdminLogin";
import UserRegister from "views/User/UserRegister";
import CreateBooking from "views/Admin/CreateBookings";
import ViewBookings from "views/Admin/ViewBookings";
import UpdateBooking from "views/Admin/UpdateBooking";

import CreatePromotion from "views/Admin/CreatePromotion";
import ViewPromotions from "views/Admin/ViewPromotions";
import UpdatePromotion from "views/Admin/UpdatePromotion";

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
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },

  // nisal
  //Vacancy Routes
  {
    path: "/create-vacancy",
    name: "Create Vacancy",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: CreateVacancy,
    layout: "/admin",
  },
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

//Meet the team routes
  {
    path: "/admin-login",
    name: "Admin/ Staff Login",
    icon: "ni ni-circle-08 text-green",
    component: AdminLogin,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "User Registration",
    icon: "ni ni-circle-08 text-yellow",
    component: UserRegister,
    layout: "/auth",
  },

  // nisal
  {
    path: "/create-technician",
    name: "Create Technician",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: CreateTechnician,
    layout: "/admin",
  },
  {
    path: "/technicians",
    name: "Technicians",
    icon: "ni ni-notification-70 text-pink",
    component: ViewTechnicians,
    layout: "/admin",
  },
  {
    path: "/update-technician/:id",
    name: "Update Technician",
    icon: "ni ni-ruler-pencil text-pink",
    component: UpdateTechnician,
    layout: "/admin",
  },
  {
    path: "/create-bookings",
    name: "Create Bookings",
    icon: "ni ni-credit-card text-purple",
    component: CreateBooking,
    layout: "/admin",
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-bell-55 text-purple",
    component: ViewBookings,
    layout: "/admin",
  },
  {
    path: "/update-bookings/:id",
    name: "Update Bookings",
    icon: "ni ni-ruler-pencil text-purple",
    component: UpdateBooking,
    layout: "/admin",
  },

  //sithija promotions
  {
    path: "/create-promotion",
    name: "Create Promotion",
    icon: "ni ni-notification-70 text-pink",
    component: CreatePromotion,
    layout: "/admin",
  },
  {
    path: "/promotions",
    name: "Promotions",
    icon: "ni ni-notification-70 text-blue",
    component: ViewPromotions,
    layout: "/admin",
  },
  {
    path: "/update-promotion/:id",
    name: "Update Promotion",
    icon: "ni ni-ruler-pencil text-green",
    component: UpdatePromotion,
    layout: "/admin",
  },

];
export default routes;
