import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, ImageSourcePropType } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../hooks/auth';
import challengeImg from '../../assets/challenge.png';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  SignOutButton,
  ChallengesList,
  ChallengesListMeta,
  Icons,
  ChallengesListTitle,
  ChallengeContainer,
  ChallengeAvatar,
  ChallengeInfo,
  ChallengeName,
  ChallengeMeta,
  ChallengeMetaText,
  BalanceContainer,
  BalanceDetails,
  Title,
  BalanceInfo,
  InfoButton
} from './styles';
import api from '../../services/api';
import { useBalance } from '../../hooks/balance';

const BALANCES_MOCK = [
  {
    name: 'Realizar 3 entregas de materiais',
    id: '1',
    icon: challengeImg,
    count: 3,
    description: '3 coletas entregues',
    completed: true
  },
  {
    name: 'Realizar 5 entregas de materiais',
    id: '2',
    icon: challengeImg,
    count: 5,
    description: '5 coletas entregues',
    completed: true
  },
  {
    name: 'Realizar 10 entregas de materiais',
    id: '3',
    icon: challengeImg,
    count: 7,
    description: '10 coletas entregues',
    completed: false
  },
  {
    name: 'Realizar 20 entregas de materiais',
    id: '4',
    icon: challengeImg,
    count: 7,
    description: '20 coletas entregues',
    completed: false
  },
  {
    name: 'Realizar 50 entregas de materiais',
    id: '5',
    icon: challengeImg,
    count: 7,
    description: '50 coletas entregues',
    completed: false
  },
  {
    name: 'Chegar a 20kg total de materiais entregues',
    id: '6',
    icon: challengeImg,
    count: 10,
    description: '20kg de materiais entregues',
    completed: false
  },
  {
    name: 'Chegar a 30kg total de materiais entregues',
    id: '7',
    icon: challengeImg,
    count: 10,
    description: '30kg de materiais entregues',
    completed: false
  },
  {
    name: 'Chegar a 20kg total de materiais entregues',
    id: '8',
    icon: challengeImg,
    count: 10,
    description: '50kg de materiais entregues',
    completed: false
  }
];

export interface Challenge {
  id: string;
  name: string;
  icon: ImageSourcePropType;
  count: number;
  description: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(BALANCES_MOCK);
  const { loading, amountFormatted } = useBalance();
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  const navigateToAccountDetails = useCallback(() => {
    navigate('AccountDetails');
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const navigateToInfo = useCallback(() => {
    navigate('Info');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <SignOutButton onPress={handleSignOut}>
          <Icon color="#c53030" size={20} name="log-out" />
        </SignOutButton>
      </Header>
      <BalanceContainer onPress={navigateToAccountDetails}>
        {!loading ? (
          <BalanceDetails>
            <Title>Conta</Title>
            <BalanceInfo>{amountFormatted}</BalanceInfo>
          </BalanceDetails>
        ) : (
          <ActivityIndicator color="#f40" />
        )}
        <Icon
          style={{ marginRight: 20 }}
          name="chevron-right"
          color="#fff"
          size={20}
        />
      </BalanceContainer>
      <ChallengesList
        data={challenges}
        keyExtractor={challenge => challenge.id}
        ListHeaderComponent={
          <ChallengesListMeta>
            <ChallengesListTitle>Desafios</ChallengesListTitle>
            <Icons>
              <Ionicons size={30} color="#F0A500" name="ios-medal" />
              <Ionicons size={30} color="#fff" name="ios-medal" />
              <Ionicons size={30} color="#fff" name="ios-medal" />
              <Ionicons size={30} color="#fff" name="ios-medal" />
              <Ionicons size={30} color="#fff" name="ios-medal" />
            </Icons>
          </ChallengesListMeta>
        }
        renderItem={({ item: challenge }) => (
          <ChallengeContainer
            isCompleted={challenge.completed}
            onPress={() => {
              console.log('here');
            }}
          >
            <ChallengeAvatar source={challenge.icon} />
            <ChallengeInfo>
              <ChallengeName>{challenge.name}</ChallengeName>
              <ChallengeMeta>
                <Icon
                  name="check"
                  size={14}
                  color={challenge.completed ? '#04d361' : '#fff'}
                />
                <ChallengeMetaText>
                  {challenge.count}/{challenge.description}
                </ChallengeMetaText>
              </ChallengeMeta>
            </ChallengeInfo>
          </ChallengeContainer>
        )}
      />
      <InfoButton onPress={navigateToInfo}>
        <Icon name="info" color="#04d361" size={50} />
      </InfoButton>
    </Container>
  );
};

export default Dashboard;
