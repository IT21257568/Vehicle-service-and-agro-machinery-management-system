import { createContext,useReducer } from 'react';

export const VacancyContext = createContext();

export const vacancyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VACANCIES':
            return {
                vacancies: action.payload
            }
        case 'CREATE_VACANCY':
            return {
                vacancies: [action.payload, ...state.vacancies]
            }
        case 'DELETE_VACANCY':
            return {
                vacancies: state.vacancies.filter((v) => v._id !== action.payload)
            }
        default:
            return state;
    }
}



export const VacancyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(vacancyReducer, {
        vacancies: null
    });
 
  return (
      <VacancyContext.Provider value={{...state, dispatch }}>
      {children}
    </VacancyContext.Provider>
  );
}