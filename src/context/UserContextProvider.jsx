import React, { createContext, useEffect, useMemo, useState } from 'react';

export const userContext = createContext();

function UserContextProvider({ children }) {
  const [User, setUser] = useState(() => {
    const data = localStorage.getItem('user-data');
    if(data){
      return JSON.parse(data);
    }
  });

  // // Update localStorage when User changes
  // useEffect(() => {
  //   if (User) {
  //     localStorage.setItem('user-data', JSON.stringify(User));
  //   } else {
  //     localStorage.removeItem('user-data');
  //   }
  // }, [User]);

  //set new value if user value changes 
  const contextValue = useMemo(() => ({ User, setUser }), [User]);

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;


// useEffect(() => {
  //   // Update localStorage when User changes
  //   localStorage.setItem('user-data', JSON.stringify(User));
  // }, [User]);