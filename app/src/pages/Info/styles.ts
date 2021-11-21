import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${getBottomSpace() + 16}px;
`;

export const Header = styled.View`
  padding: 24px;
  background: #232240;
  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const HeaderMeta = styled.View``;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #fff;
  align-self: center;
`;

export const InfoContainer = styled.ScrollView`
  margin: 20px;
`;

export const InfoSection = styled.View`
  margin: 10px;
`;

export const InfoSectionTitle = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const InfoSectionText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 13px;
`;
