import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import { Challenge } from './index';

interface IChallengeContainerProps {
  isCompleted: boolean;
}

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${getBottomSpace() + 16}px;
`;

export const Header = styled.View`
  padding: 24px;
  background: #232240;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
`;

export const UserName = styled.Text`
  color: #04d361;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
`;

export const SignOutButton = styled.TouchableOpacity``;

export const BalanceContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

export const BalanceDetails = styled.View`
  flex: 1;
  padding: 32px 24px 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
`;

export const BalanceInfo = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ChallengesList = styled(FlatList as new () => FlatList<Challenge>)`
  padding: 32px 24px 16px;
`;

export const ChallengesListMeta = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Icons = styled.View`
  flex-direction: row;
`;

export const ChallengesListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #04d361;
  font-family: 'RobotoSlab-Medium';
`;

export const ChallengeContainer = styled(RectButton)<IChallengeContainerProps>`
  background: ${props => (props.isCompleted ? '#0d4611' : ' #1E1D34')};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
`;

export const ChallengeAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ChallengeInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ChallengeName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ChallengeMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ChallengeMetaText = styled.Text`
  margin-left: 8px;
  color: #837f7c;
  font-family: 'RobotoSlab-Regular';
`;

export const InfoButton = styled(RectButton)`
  background: #232240;
  bottom: 0;
  right: 0;
  margin: 30px;
  position: absolute;
  border-radius: 25px;
`;
