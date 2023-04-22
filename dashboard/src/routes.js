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

import CreateSparePart from "views/Admin/CreateSparePart";
import ViewSpareParts from "views/Admin/ViewSpareParts";
import UpdateSparePart from "views/Admin/UpdateSparePart";

import CreateProgressTracking from "views/Admin/CreateProgressTracking";
import ViewProgressStatus from "views/Admin/ViewProgressStatus";
import UpdateProgressStatus from "views/Admin/UpdateProgressStatus";

import CreateAgroProduct from "views/Admin/CreateAgroProduct";
import ViewAgroProducts from "views/Admin/ViewAgroProducts";
import UpdateAgroProduct from "views/Admin/UpdateAgroProduct";
import CreateRepairJob from "views/Admin/CreateRepairJob";
import ViewRepairJobs from "views/Admin/ViewRepairJobs";
import UpdateRepairJob from "views/Admin/UpdateRepairJob";
import CreateGeneralIssue from "views/Admin/CreateGeneralIssues";
import ViewGeneralIssues from "views/Admin/ViewGeneralIssues";
import UpdateGeneralIssue from "views/Admin/UpdateGeneralIssues";

import CreateFAQ from "views/Admin/CreateFAQ";
import ViewFAQs from "views/Admin/ViewFAQs";
import UpdateFAQ from "views/Admin/updateFAQ";

// User views
import DummyPage from "views/User/DummyPage";
import SparePartsPage from "views/User/SparePartsPage";

// nisal
import ViewCVSubmissions from "views/Admin/ViewCVSubmissions";
import Career from "views/User/Career";
import ApplyNow from "views/User/ApplyNow";

// Sithija user views
import Promotions from "views/User/PromotionsPage";
import FAQs from "views/User/FAQPage";


//Janindu user views
import CreateClientBooking from "views/User/BookingPage";

// Pehesarani user views
import AgroProductsPage from "views/User/AgroProductsPage";

//nisa
import ViewMeetTheTeam from "views/User/MeetTheTeam"; 

//Pehesarani admin views
import ViewOrderAgroProducts from "views/Admin/ViewOrderAgroProducts";

//Pehesarani user views
import OrderAgroProduct from "views/User/OrderAgroProduct";

// nethum user progress
import ProgressStatusPage from "views/User/ProgressStatusPage";

//home page
import Home from "./views/User/HomePage";


const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
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

  //Pawan - User Routes
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
  //Nisal - Vacancy admin Routes
  {
    path: "/create-vacancy",
    name: "Create Vacancy",
    icon: "ni ni-calendar-grid-58 text-red",
    component: CreateVacancy,
    layout: "/admin",
  },
  {
    path: "/vacancies",
    name: "Vacancies",
    icon: "ni ni-notification-70 text-red",
    component: ViewVacancies,
    layout: "/admin",
  },
  {
    path: "/update-vacancy/:id",
    name: "Update Vacancy",
    icon: "ni ni-ruler-pencil text-red",
    component: UpdateVacancy,
    layout: "/admin",
  },
  //User Views
  {
    path: "/carrerpage",
    name: "Career",
    icon: "ni ni-ruler-pencil text-red",
    component: Career,
    layout: "/user",
  },
  // Nisal - Technician Admin views
  {
    path: "/create-technician",
    name: "Create Technician",
    icon: "ni ni-calendar-grid-58 text-red",
    component: CreateTechnician,
    layout: "/admin",
  },
  {
    path: "/technicians",
    name: "Technicians",
    icon: "ni ni-notification-70 text-red",
    component: ViewTechnicians,
    layout: "/admin",
  },
  {
    path: "/update-technician/:id",
    name: "Update Technician",
    icon: "ni ni-ruler-pencil text-red",
    component: UpdateTechnician,
    layout: "/admin",
  },
  //Nisal Meet The Team user view
  {
    path: "/meet-the-team",
    name: "Meet The Team",
    icon: "ni ni-notification-70 text-red",
    component: ViewMeetTheTeam,
    layout: "/user",
  },
  //Nisal CV Submission
  {
    path: "/cv-submission",
    name: "CV Submissions",
    icon: "ni ni-notification-70 text-red",
    component: ViewCVSubmissions,
    layout: "/admin",
  },
  {
    path: "/applynowpage/:id",
    name: "Apply Now",
    icon: "ni ni-ruler-pencil text-red",
    component: ApplyNow,
    layout: "/user",
  },

  //Janindu - Booking Admin views
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
  //Janindu user views
  {
    path: "/create-client-booking",
    name: "Client Bookings",
    icon: "ni ni-credit-card text-purple",
    component: CreateClientBooking,
    layout: "/user",
  },

  //sithija promotions
  {
    path: "/create-promotion",
    name: "Create Promotion",
    icon: "ni ni-notification-70 text-orange",
    component: CreatePromotion,
    layout: "/admin",
  },
  {
    path: "/promotions",
    name: "Promotions",
    icon: "ni ni-notification-70 text-orange",
    component: ViewPromotions,
    layout: "/admin",
  },
  {
    path: "/update-promotion/:id",
    name: "Update Promotion",
    icon: "ni ni-ruler-pencil text-orange",
    component: UpdatePromotion,
    layout: "/admin",
  },
  //Sithija user view for promotions
  {
    path: "/promotions-page",
    name: "Promotions",
    icon: "ni ni-notification-70 text-orange",
    component: Promotions,
    layout: "/user",
  },
   //Sithija FAQ section
   {
    path: "/create-faq",
    name: "Create FAQ",
    icon: "ni ni-notification-70 text-orange",
    component: CreateFAQ,
    layout: "/admin",
  },
  {
    path: "/faqs",
    name: "FAQ Section",
    icon: "ni ni-notification-70 text-orange",
    component: ViewFAQs,
    layout: "/admin",
  },
  {
    path: "/update-faq/:id",
    name: "Update FAQs",
    icon: "ni ni-notification-70 text-orange",
    component: UpdateFAQ,
    layout: "/admin",
  },
  //Sithija user view for FAQ section
  {
    path: "/faq-page",
    name: "FAQs",
    icon: "ni ni-notification-70 text-orange",
    component: FAQs,
    layout: "/user",
  },

  //Pehesarai spare parts admin routes
  {
    path: "/spare-parts",
    name: "Spare Parts",
    icon: "ni ni-notification-70 text-blue",
    component: ViewSpareParts,
    layout: "/admin",
  },
  {
    path: "/create-spare-part",
    name: "Create Spare Part",
    icon: "ni ni-notification-70 text-blue",
    component: CreateSparePart,
    layout: "/admin",
  },
  {
    path: "/update-spare-part/:id",
    name: "Update Spare Part",
    icon: "ni ni-ruler-pencil text-blue",
    component: UpdateSparePart,
    layout: "/admin",
  },
  //User - Pehesasarani Spare Parts
  {
    path: "/spareParts",
    name: "Spare Parts Page",
    icon: "ni ni-ruler-pencil text-blue",
    component: SparePartsPage,
    layout: "/user",
  },
  //Pehesarani - Agro Products admin routes
  {
    path: "/agro-products",
    name: "Agro Products",
    icon: "ni ni-notification-70 text-blue",
    component: ViewAgroProducts,
    layout: "/admin",
  },
  {
    path: "/create-agro-product",
    name: "Create Agro Product",
    icon: "ni ni-notification-70 text-blue",
    component: CreateAgroProduct,
    layout: "/admin",
  },
  {
    path: "/update-agro-product/:id",
    name: "Update Agro Product",
    icon: "ni ni-ruler-pencil text-blue",
    component: UpdateAgroProduct,
    layout: "/admin",
  },
  //User - Pehesarani Agro Products
  {
    path: "/agroProducts",
    name: "Agro Product Page",
    icon: "ni ni-ruler-pencil text-blue",
    component: AgroProductsPage,
    layout: "/user",
  },
   //Pehesarani - View Agro Products orders admin routes
   {
    path: "/agro-products-orders",
    name: "Agro Product Orders",
    icon: "ni ni-settings text-blue",
    component: ViewOrderAgroProducts,
    layout: "/admin",
  },
  //User - Pehesarani Agro Products
  {
    path: "/order-agro-product/:id",
    name: "Order Agro Product",
    icon: "ni ni-ruler-pencil text-blue",
    component: OrderAgroProduct,
    layout: "/user",
  },

  //Nethum - progress tracking admin routes
  {
    path: "/create-progress",
    name: "Create Progress Status",
    icon: "ni ni-notification-70 text-green",
    component: CreateProgressTracking,
    layout: "/admin",
  },
  {
    path: "/progress",
    name: "All Progress Status",
    icon: "ni ni-notification-70 text-green",
    component: ViewProgressStatus,
    layout: "/admin",
  },
  {
    path: "/update-progress/:id",
    name: "Update Progress Status",
    icon: "ni ni-ruler-pencil text-green",
    component: UpdateProgressStatus,
    layout: "/admin",
  },
  // nethum - progress tarcking
  {
    path: "/progress-page",
    name: "Servise Progresss Status",
    icon: "ni ni-notification-70 text-green",
    component: ProgressStatusPage,
    layout: "/user",
  },

  //Tharusha - Create repair jobs admin routes
  {
    path: "/ceate-repair-job",
    name: "Create Repair Job",
    icon: "ni ni-settings text-black",
    component: CreateRepairJob,
    layout: "/admin",
  },
  {
    path: "/view-repair-jobs",
    name: "View Repair Jobs",
    icon: "ni ni-active-40 text-black",
    component: ViewRepairJobs,
    layout: "/admin",
  },
  {
    path: "/update-repair-job/:id",
    name: "Update Repair Job",
    icon: "ni ni-ruler-pencil text-black",
    component: UpdateRepairJob,
    layout: "/admin",
  },
  
  //Piyumi general issues
  {
    path: "/create-general-issue",
    name: "Create General Issue",
    icon: "ni ni-single-copy-04 text-purple",
    component: CreateGeneralIssue,
    layout: "/admin",
  },
  {
    path: "/view-general-issues",
    name: "View General Issues",
    icon: "ni ni-notification-70 text-purple",
    component: ViewGeneralIssues,
    layout: "/admin",
  },
  {
    path: "/update-general-issues/:id",
    name: "Update General Issue",
    icon: "ni ni-ruler-pencil text-purple",
    component: UpdateGeneralIssue,
    layout: "/admin",
  },
  // USER VIEWS
  {
    path: "/dummypage",
    name: "Dummy Page",
    icon: "ni ni-ruler-pencil text-green",
    component: DummyPage,
    layout: "/user",
  },
  //home view
  {
    path: "/home-page",
    name: " ",
    icon: "ni ni-ruler-pencil text-green",
    component: Home,
    layout: "/user",
  },

];
export default routes;