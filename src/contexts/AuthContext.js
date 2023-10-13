import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  token: null,
  username: "",
};


const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.username,
        expiration: action.payload.expiration,
      };
    case 'LOGOUT':
      return { ...initialState, expiration: null };
    default:
      return state;
  }
};


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedAuthState = JSON.parse(localStorage.getItem('authState'));
    if (storedAuthState && storedAuthState.expiration > Date.now()) {
      dispatch({ type: 'LOGIN', payload: storedAuthState });
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
