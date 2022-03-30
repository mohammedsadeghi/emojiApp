import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './Home.Screen';
import {History} from './History.Screen';
const BottomTab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="History" component={History} />
    </BottomTab.Navigator>
  );
};
