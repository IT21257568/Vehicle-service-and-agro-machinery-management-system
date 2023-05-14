require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const { errorHandler } = require("./middleware/errorMiddleware");

const vanaciesRoute = require("./routes/vanaciesRoute");
const sparePartsRoutes = require("./routes/spareParts");
const agroProductRoutes = require("./routes/AgroRoute");
const meetTeamRoute = require("./routes/MeetTeamRoute");
const promotionRoute = require("./routes/promotionRoute");
const userRoutes = require("./routes/userRoutes");
const bookingsRoute = require("./routes/bookingsRoute");
const ProgressTrackingRoute = require("./routes/ProgressTrackingRoute");
const damageValuationRoutes = require("./routes/damageValuation");
const faqRoute = require("./routes/faqRoute");
const cvSubmissionRoute = require("./routes/cvSubmissionRoute");
const generalIssueRoutes = require("./routes/generalIssue");
const orderAgroProductRoute = require("./routes/orderAgroProductRoute");
const emergencyIssueRoutes = require("./routes/emergencyIssue");
const orderSparePartRoute = require("./routes/orderSparePartRoute");
const feedbackRoute = require("./routes/feedbackRoute");

const employeeRoutes = require("./routes/employeeRoutes");

// setup cors
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
//Nisal
app.use("/api/vacancies", vanaciesRoute);
app.use("/api/mTeams", meetTeamRoute);
app.use("/api/cvSub", cvSubmissionRoute);
//Pehesarani
app.use("/api/spareParts", sparePartsRoutes);
app.use("/api/agroProducts", agroProductRoutes);
app.use("/api/orderAgroProduct", orderAgroProductRoute);
app.use("/api/orderSparePart", orderSparePartRoute);
// Pawan
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
//Janindu
app.use("/api/bookings", bookingsRoute);
//Sithija
app.use("/api/promotions", promotionRoute);
app.use("/api/faqs", faqRoute);
app.use("/api/feedback", feedbackRoute);
//Nethum
app.use("/api/progress", ProgressTrackingRoute);
//Tharusha
app.use("/api/damageValuation", damageValuationRoutes);
//Piyumi
app.use("/api/generalIssues", generalIssueRoutes);
app.use("/api/emergencyIssues", emergencyIssueRoutes);

app.use(errorHandler);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to the DB and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => console.log(err));
