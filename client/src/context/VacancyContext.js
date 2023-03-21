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