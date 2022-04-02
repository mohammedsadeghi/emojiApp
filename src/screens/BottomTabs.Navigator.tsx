import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './Home.Screen';
import {History} from './History.Screen';
import {AnalyticsIcon, HistoryIcon, HomeIcon} from '../components/Icons';
import {theme} from '../Theme';
const BottomTab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {fontFamily: theme.fontFamilyBold},
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }

          if (route.name === 'History') {
            return <HistoryIcon color={color} size={size} />;
          }
          if (route.name === 'Analytics') {
            return <AnalyticsIcon color={color} size={size} />;
          }

          return null;
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{title: "Today's Mood"}}
      />
      <BottomTab.Screen
        name="History"
        component={History}
        options={{title: 'History of Moods'}}
      />
      <BottomTab.Screen
        name="Analytics"
        component={History}
        options={{title: 'Analytic of Moods'}}
      />
    </BottomTab.Navigator>
  );
};
