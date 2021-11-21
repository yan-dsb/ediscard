import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AccountDetailsContainer = styled.View`
  padding: 24px 24px;
`;

export const AccountDetailsInfo = styled.View``;

export const BalanceTitle = styled.Text`
  color: #837f7c;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const BalanceInfo = styled.Text`
  color: #f4ede8;
  font-size: 36px;
  font-family: 'RobotoSlab-Medium';
`;

export const RecycledMaterialsList = styled.View`
  margin-bottom: ${getBottomSpace() + 16}px;
`;

export const RecycledMaterialsListTitle = styled.Text`
  margin-left: 24px;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #fff;
`;

export const RecycledMaterialContainer = styled.View`
  border-bottom-width: 0.2px;
  border-color: #fff;
`;

export const RecycledMaterialInfo = styled.View`
  margin: 10px;
  flex-direction: row;
  align-items: center;
`;

export const RecycledMaterialDetails = styled.View`
  margin-left: 10px;
`;

export const RecycledMaterialWeightAmountMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const RecycledMaterialWeightAmountText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  margin-left: 8px;
`;

export const RecycledMaterialBalanceGeneratedMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const RecycledMaterialBalanceGeneratedText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  margin-left: 8px;
`;

export const RecycledMaterialCreatedAtMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-right: 12px;
`;

export const RecycledMaterialCreatedAtText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #837f7c;
  margin-left: 8px;
`;

export const RecycledMaterialImage = styled.Image`
  width: 74px;
  height: 74px;
  border-radius: 37px;
`;
