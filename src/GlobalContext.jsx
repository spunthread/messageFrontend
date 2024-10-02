import { createContext, useReducer, useContext } from "react";

// Create context
export const GlobalContext = createContext();

// Default state
const defaultState = {
  isLoad: false,
  token: null,
  loading: false,
  error: null, // Include error in the default state
  extra: null,
};

// Reducer
export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN": {
      return {
        ...state,
        token: payload, // Handle token for sign-in
        loading: false,
      };
    }

    case "LOGOUT": {
      return { ...defaultState };
    }
   
  
    default:
      return state;
  }
};

// Custom hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, defaultState);


  return (
    <GlobalContext.Provider
      value={{
        auth,
        dispatch,
     
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
