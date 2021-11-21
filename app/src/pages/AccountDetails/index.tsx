import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Header,
  AccountDetailsContainer,
  AccountDetailsInfo,
  BalanceTitle,
  BalanceInfo,
  RecycledMaterialsList,
  RecycledMaterialsListTitle,
  RecycledMaterialContainer,
  RecycledMaterialInfo,
  RecycledMaterialDetails,
  RecycledMaterialImage,
  RecycledMaterialWeightAmountMeta,
  RecycledMaterialWeightAmountText,
  RecycledMaterialBalanceGeneratedMeta,
  RecycledMaterialBalanceGeneratedText,
  RecycledMaterialCreatedAtMeta,
  RecycledMaterialCreatedAtText
} from './styles';
import api from '../../services/api';
import circuitImg from '../../assets/circuit.png';
import { useBalance } from '../../hooks/balance';

export interface RecycledMaterial {
  id: string;
  weight_amount: number;
  balance_generated: number;
  created_at: Date;
  balanceGeneratedFormatted: string;
  createdAtFormatted: string;
}

const AccountDetails: React.FC = () => {
  const [recycledMaterials, setRecycledMaterials] = useState<
    RecycledMaterial[]
  >([]);

  const { amountFormatted } = useBalance();
  const { goBack } = useNavigation();

  useEffect(() => {
    api
      .get<RecycledMaterial[]>('/recycled-materials/me')
      .then(response => {
        const { data } = response;
        const recycledMaterialsFormatted = data.map(el => {
          return {
            ...el,
            balanceGeneratedFormatted: new Intl.NumberFormat('PT-br', {
              style: 'currency',
              currency: 'BRL'
            }).format(el.balance_generated),
            createdAtFormatted: format(
              new Date(el.created_at).getTime(),
              "EEEE 'dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
              {
                locale: ptBR
              }
            )
          };
        });
        setRecycledMaterials(recycledMaterialsFormatted);
      })
      .catch(error => console.log(error));
  }, []);

  const backToDashboard = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <>
      <Header>
        <Icon
          onPress={backToDashboard}
          size={25}
          color="#fff"
          name="chevron-left"
        />
      </Header>
      <Container>
        <AccountDetailsContainer>
          <AccountDetailsInfo>
            <BalanceTitle>Saldo disponível</BalanceTitle>
            <BalanceInfo>{amountFormatted}</BalanceInfo>
          </AccountDetailsInfo>
        </AccountDetailsContainer>
        <RecycledMaterialsList>
          <RecycledMaterialsListTitle>
            Histórico de Entregas
          </RecycledMaterialsListTitle>
          {recycledMaterials.map(recycledMaterial => {
            return (
              <RecycledMaterialContainer key={recycledMaterial.id}>
                <RecycledMaterialInfo>
                  <RecycledMaterialImage source={circuitImg} />
                  <RecycledMaterialDetails>
                    <RecycledMaterialWeightAmountMeta>
                      <Icon name="hard-drive" size={14} color="#04d361" />
                      <RecycledMaterialWeightAmountText>
                        Valor Pesado: {recycledMaterial.weight_amount}Kg
                      </RecycledMaterialWeightAmountText>
                    </RecycledMaterialWeightAmountMeta>
                    <RecycledMaterialBalanceGeneratedMeta>
                      <Icon name="hard-drive" size={14} color="#04d361" />
                      <RecycledMaterialBalanceGeneratedText>
                        Valor Retornado{' '}
                        {recycledMaterial.balanceGeneratedFormatted}
                      </RecycledMaterialBalanceGeneratedText>
                    </RecycledMaterialBalanceGeneratedMeta>
                    <RecycledMaterialCreatedAtMeta>
                      <Icon name="calendar" size={14} color="#04d361" />
                      <RecycledMaterialCreatedAtText>
                        Data de entrega: {recycledMaterial.createdAtFormatted}
                      </RecycledMaterialCreatedAtText>
                    </RecycledMaterialCreatedAtMeta>
                  </RecycledMaterialDetails>
                </RecycledMaterialInfo>
              </RecycledMaterialContainer>
            );
          })}
        </RecycledMaterialsList>
      </Container>
    </>
  );
};

export { AccountDetails };
