import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages & components
import Carrer from "./pages/Carrer";
import Navbar from "./components/Navbar";
import Nisal from "./components/updateVacancyForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Carrer />} />
            <Route path="/UpdateVacancy/:id" element={<Nisal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
