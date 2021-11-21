import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo
} from 'react';
import api from '../services/api';
import { useAuth } from './auth';

interface BalanceData {
  id: string;
  amount: number;
}

interface BalanceContextData {
  balance: BalanceData;
  loading: boolean;
  amountFormatted: string;
}

const BalanceContext = createContext<BalanceContextData>(
  {} as BalanceContextData
);

export const BalanceProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<BalanceData>({} as BalanceData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<BalanceData>('/balances/me')
      .then(response => {
        const { data } = response;

        setBalance(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const amountFormatted = useMemo(() => {
    return new Intl.NumberFormat('PT-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(balance.amount);
  }, [balance]);
  return (
    <BalanceContext.Provider value={{ balance, amountFormatted, loading }}>
      {children}
    </BalanceContext.Provider>
  );
};

export function useBalance(): BalanceContextData {
  const context = useContext(BalanceContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
