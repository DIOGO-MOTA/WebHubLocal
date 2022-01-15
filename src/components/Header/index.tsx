import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Content>
        <a href="/">HubLocal</a>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </Content>
    </Container>
  );
};

export default Header;
