import { VacancyContext } from "../context/VacancyContext";
import { useContext} from "react";

export const useVacancyContext = () => {
    const context = useContext(VacancyContext);
    
    if (!context) {
        throw Error('useVacancyContext must be used within a VacancyContextProvider');
    }

  return context;
}