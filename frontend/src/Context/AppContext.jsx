import { createContext, useState } from "react"

const dataContext = createContext({});

export const DataProvider = ({children}) => {
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

// const AppContext = () => {
  return (
    <dataContext.Provider value={{name, setName, isAdmin, setIsAdmin}}>
        {children}
    </dataContext.Provider>
  )
}

export default dataContext;