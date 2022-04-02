import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {BottomTabs} from './screens/BottomTabs.Navigator';
import {AppProvider} from './App.provider';
import {Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </AppProvider>
  );
};
