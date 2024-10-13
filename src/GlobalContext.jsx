import { createContext, useReducer } from "react";

// Create context
export const GlobalContext = createContext();

// Default state
const defaultState = {
  token: "",
  name: "",
  emails: [],
  picture: "",
};

// Reducer
const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN": {
      return {
        ...state,
        ...payload,
      };
    }

    case "LOGOUT": {
      return defaultState;
    }

    default:
      return state;
  }
};

export function GlobalProvider({ children }) {
  const [auth, dispatch] = useReducer(authReducer, defaultState);

  return (
    <GlobalContext.Provider
      value={{
        auth,
        dispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
