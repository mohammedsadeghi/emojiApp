import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './Home.Screen';
import {History} from './History.Screen';
import {HistoryTab, HomeIcon} from '../components/Icons';
import {Text} from 'react-native-svg';
const BottomTab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size, focused}) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }

          if (route.name === 'History') {
            return <HistoryTab color={color} size={size} />;
          }

          return null;
        },
      })}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="History" component={History} />
    </BottomTab.Navigator>
  );
};
