import { createContext,useReducer } from 'react';

export const AllContext = createContext();

export const AllReducer = (state, action) => {
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
                vacancies: state.vacancies.filter((W) => W._id !== action.payload._id)
            }
        case 'UPDATE_VACANCY':
            return {
                vacancies: [action.payload, ...state.vacancies]
            }
        default:
            return state;
    }
}



export const AllContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AllReducer, {
        vacancies: null
    });
 
  return (
      <AllContext.Provider value={{...state, dispatch }}>
      {children}
    </AllContext.Provider>
  );
}