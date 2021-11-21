import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  HeaderMeta,
  HeaderTitle,
  InfoContainer,
  InfoSection,
  InfoSectionTitle,
  InfoSectionText
} from './styles';

const Info: React.FC = () => {
  const { goBack } = useNavigation();

  const backToDashboard = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <Container>
      <Header>
        <Icon
          onPress={backToDashboard}
          size={25}
          color="#fff"
          name="chevron-left"
        />
        <HeaderMeta>
          <HeaderTitle>Informações</HeaderTitle>
        </HeaderMeta>
      </Header>
      <InfoContainer>
        <InfoSection>
          <InfoSectionTitle>Sobre</InfoSectionTitle>
          <InfoSectionText>
            Sed non ligula non tortor cursus aliquam egestas in orci. Nunc
            commodo tempor mi eget suscipit. Praesent et metus sit amet quam
            rhoncus imperdiet. Nulla molestie dignissim lacus, eu egestas ex
            rhoncus ac. Integer pulvinar dui et ipsum malesuada ultrices.
            Praesent feugiat bibendum nisl, a pulvinar mauris lobortis eu. Proin
            dignissim blandit nibh, eu lacinia nibh interdum a. Phasellus quam
            lectus, venenatis sed ullamcorper eget, ultrices at nisi. Nullam id
            justo felis. Ut pretium congue felis, sit amet sagittis dolor
            dapibus nec. Etiam neque lacus, molestie ac ultricies nec, hendrerit
            non nisi. Fusce ac molestie turpis. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </InfoSectionText>
        </InfoSection>
        <InfoSection>
          <InfoSectionTitle>Sobre</InfoSectionTitle>
          <InfoSectionText>
            Nunc vehicula, leo nec semper maximus, sapien orci imperdiet mi,
            vitae suscipit risus purus sit amet augue. Maecenas id massa nisi.
            Nullam congue leo lectus, et interdum urna faucibus sed. Aliquam non
            quam eu massa gravida elementum. In rhoncus volutpat quam eget
            dictum. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Nunc eget aliquet leo. Sed dignissim
            nisi quis eleifend volutpat. Fusce fermentum arcu et nisi sagittis,
            ut malesuada sapien lobortis. Proin laoreet est vitae ipsum varius
            efficitur. Etiam nec accumsan nibh, vel vestibulum nisl.
          </InfoSectionText>
        </InfoSection>
        <InfoSection>
          <InfoSectionTitle>Sobre</InfoSectionTitle>
          <InfoSectionText>
            Interdum et malesuada fames ac ante ipsum primis in faucibus. In sed
            urna sagittis, gravida nisi ut, laoreet enim. Mauris tempus nunc nec
            commodo porttitor. Praesent vehicula gravida lorem, quis interdum
            nisl laoreet at. Quisque dapibus scelerisque diam vitae interdum.
            Aenean augue ipsum, iaculis id lorem sed, tristique laoreet lacus.
            Nam a vulputate nibh, a iaculis sapien. Etiam tempor a odio a
            bibendum. Praesent vulputate, ex nec eleifend vehicula, ex risus
            convallis purus, sit amet sollicitudin turpis tortor ut tellus.
            Fusce iaculis metus at diam ullamcorper vulputate. Ut sed nunc quam.
            Integer vitae lorem fringilla, condimentum lorem nec, facilisis
            lacus. Proin malesuada, enim quis sollicitudin ultrices, augue
            sapien lobortis mauris, a porta eros ex non justo. Proin fringilla
            pharetra eros eu gravida. Sed mollis quam dolor, id dignissim magna
            faucibus vel. Cras sit amet aliquam libero, et egestas enim.
          </InfoSectionText>
        </InfoSection>
      </InfoContainer>
    </Container>
  );
};

export { Info };
