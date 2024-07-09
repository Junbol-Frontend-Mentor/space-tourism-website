import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import { Home } from './components/pages/home';
import { DestinationPage } from './components/pages/destination-page';
import { CrewPage } from './components/pages/crew-page';
import { TechnologyPage } from './components/pages/technology-page';
import { Root } from './components/Root';
import { AppProvider } from './context/AppContext';

export const App: FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="space-tourism-website" element={<Home />} />
          <Route path="space-tourism-website/destination-page" element={<DestinationPage />} />
          <Route path="space-tourism-website/crew-page" element={<CrewPage />} />
          <Route path="space-tourism-website/technology-page" element={<TechnologyPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

// FC is a type definition for functional components in TypeScript.
// It stands for Functional Component.

// React.FC is a type definition for functional components in TypeScript.
// It stands for React Functional Component.
