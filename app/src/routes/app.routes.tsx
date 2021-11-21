import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import { AccountDetails } from '../pages/AccountDetails';
import { Info } from '../pages/Info';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#2b2a4a' }
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="AccountDetails" component={AccountDetails} />
    <App.Screen name="Info" component={Info} />
  </App.Navigator>
);

export default AppRoutes;
