import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {BottomTabs} from './screens/BottomTabs.Navigator';
import {AppProvider} from './App.provider';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </AppProvider>
  );
};
