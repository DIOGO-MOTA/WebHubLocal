import React from 'react';
import Header from '../../components/Header';
import CompaniesTable from '../../components/CompaniesTable';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <CompaniesTable />
      </Container>
    </>
  );
};

export default Dashboard;
