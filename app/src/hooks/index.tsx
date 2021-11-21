import React from 'react';
import { AuthProvider } from './auth';
import { BalanceProvider } from './balance';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <BalanceProvider>{children}</BalanceProvider>
  </AuthProvider>
);

export default AppProvider;
