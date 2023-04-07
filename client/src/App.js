import {BrowserRouter,Routes,Route} from 'react-router-dom';

//pages & components
import Home from './pages/Carrer'
import Navbar from './components/Navbar'
import UpdateVacancy from './components/updateVacancyForm'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path = "/" 
              element={<Home/>}
            />
            <Route
              path = "/UpdateVacancy" 
              element={<UpdateVacancy/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
