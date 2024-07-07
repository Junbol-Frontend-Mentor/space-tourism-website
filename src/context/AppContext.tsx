import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// ReactNode: This is a type used in TypeScript to represent any valid React child. It's used here to type the children prop in the context provider, allowing it to accept any React components. In this case, ReactNode is used to specify that the children prop can be any valid React node (elements, strings, numbers, fragments, etc.). This helps TypeScript understand what kinds of values are valid for children, enabling better type-checking and autocomplete features.

// Define the shape of the context state using an interface
interface AppContextType {
  selectedDestination: string;
  setSelectedDestination: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value of undefined
export const AppContext = createContext<AppContextType | undefined>(undefined);//Context Initialization: By providing undefined initially, you indicate that the context may not have a value until it is explicitly provided. This helps catch errors where the context is used without a provider. ype Safety: By typing the context with AppContextType | undefined, TypeScript ensures that components using this context must handle the case where the context might not be provided.


// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Create a provider component to wrap the app and provide the app context
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {//here not only Im typing the AppProvider functional component with FC but also including the types for the props that the component will accept by using angle brackets <> and using the type ReactNode which is a type used in TypeScript to represent any valid React child. It's used here to type the children prop in the context provider, allowing it to accept any React components.
  const [selectedDestination, setSelectedDestination] = useState<string>('Moon');

  return <AppContext.Provider value={{ selectedDestination, setSelectedDestination }}>{children}</AppContext.Provider>;
};


