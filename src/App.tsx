import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {BottomTabs} from './screens/BottomTabs.Navigator';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};
