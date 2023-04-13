import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components
import Carrer from "./pages/Carrer";
import MeetTheTeam from "./pages/MeetTheTeam";
import Navbar from "./components/Navbar";
import UpdateVacancy from "./components/UpdateVacancyForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/carrer" element={<Carrer />} />
            <Route path="/meettheteam" element={<MeetTheTeam />} />
            <Route path="/carrer/UpdateVacancy/:id" element={<UpdateVacancy />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
