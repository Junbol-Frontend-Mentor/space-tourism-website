import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './components/pages/home';
import { DestinationPage } from './components/pages/destination-page';
import { CrewPage } from './components/pages/crew-page';
import { TechnologyPage } from './components/pages/technology-page';
import { Root } from './components/Root';
import { AppProvider } from './context/AppContext';

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Home />} />
              <Route path="space-tourism-website" element={<Home />} />
              <Route path="space-tourism-website/destination-page" element={<DestinationPage />}>
                <Route path="moon" element={<DestinationPage />} />{' '}
                {/* 🚩for every page inside the destination-page I needed to add all these ones */}
                <Route path="mars" element={<DestinationPage />} />
                <Route path="europa" element={<DestinationPage />} />
                <Route path="titan" element={<DestinationPage />} />
              </Route>
              <Route path="space-tourism-website/crew-page" element={<CrewPage />}>
                <Route path="douglas-hurley" element={<CrewPage />} />
                <Route path="mark-shuttleworth" element={<CrewPage />} />
                <Route path="victor-glover" element={<CrewPage />} />
                <Route path="anousheh-ansari" element={<CrewPage />} />
              </Route>
              <Route path="space-tourism-website/technology-page" element={<TechnologyPage />}>
                <Route path="launch-vehicle" element={<TechnologyPage />} />
                <Route path="spaceport" element={<TechnologyPage />} />
                <Route path="space-capsule" element={<TechnologyPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ChakraProvider>
  );
};

// FC is a type definition for functional components in TypeScript.
// It stands for Functional Component.

// React.FC is a type definition for functional components in TypeScript.
// It stands for React Functional Component.
