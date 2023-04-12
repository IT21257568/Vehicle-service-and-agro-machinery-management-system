import { AllContext } from "../context/AllContext";
import { useContext } from "react";

export const useAllContext = () => {
    const context = useContext(AllContext);

    if (!context) {
        throw Error('useVacancyContext must be used within a VacancyContextProvider');
    }

    return context;
}