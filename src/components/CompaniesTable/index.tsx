/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { FiEdit3, FiFilePlus, FiTrash2 } from 'react-icons/fi';
import { MdPlace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import api from '../../services/api';
import ModalAddCompany from '../ModalAddCompany';
import ModalUpdateCompany from '../ModalUpdateCompany';

import { Container } from './styles';

interface Icompany {
  id: string;
  name: string;
  cnpj: string;
  description: string;
}

const CompaniesTable: React.FC = () => {
  const [companies, setCompanies] = useState<Icompany[]>([]);

  const [updateCompany, setUpdateCompany] = useState<Icompany>({} as Icompany);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCompanies(): Promise<void> {
      try {
        const response = await api.get('/companies');
        setCompanies(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCompanies();
  }, [companies]);

  async function handleDeleteCompany(id: string): Promise<void> {
    try {
      await api.delete(`/companies/${id}`);

      setCompanies(companies.filter(company => company.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateCompany(
    company: Omit<Icompany, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/companies/${updateCompany.id}`, {
        ...updateCompany,
        ...company,
      });

      setCompanies(
        companies.map(mappedCompany =>
          mappedCompany.id === updateCompany.id
            ? { ...response.data }
            : mappedCompany,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddCompany(
    company: Omit<Icompany, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.post('/companies', {
        ...company,
      });

      setCompanies([...companies, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  function openModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleUpdateModal(): void {
    setUpdateModalOpen(!updateModalOpen);
  }

  function handleEditCompany(company: Icompany): void {
    setUpdateCompany(company);
    toggleUpdateModal();
  }

  return (
    <>
      <ModalAddCompany
        isOpen={modalOpen}
        setIsOpen={openModal}
        handleAddCompany={handleAddCompany}
      />

      <ModalUpdateCompany
        isOpen={updateModalOpen}
        setIsOpen={toggleUpdateModal}
        updateCompany={updateCompany}
        handleUpdateCompany={handleUpdateCompany}
      />
      <Container>
        <Table>
          <Thead>
            <Tr>
              <Th>Empresa</Th>
              <Th>CNPJ</Th>
              <Th>Descrição</Th>
              <Th>Endereço</Th>
              <Th>Opções</Th>
              <Th>
                <button
                  type="button"
                  className="icon"
                  onClick={() => openModal()}
                  data-testid="criar-company"
                >
                  <FiFilePlus size={20} />
                </button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.map(company => (
              <Tr key={company.id}>
                <Td>{company.name}</Td>
                <Td>{company.cnpj}</Td>
                <Td>{company.description}</Td>
                <Td>
                  <Link to={`/address/${company.id}`}>
                    <MdPlace size={40} />{' '}
                  </Link>
                </Td>
                <Td>
                  <button
                    type="button"
                    className="icon"
                    onClick={() => handleEditCompany(company)}
                    data-testid={`edit-company-${company.id}`}
                  >
                    <FiEdit3 size={20} />
                  </button>
                </Td>
                <Td>
                  <button
                    type="button"
                    className="icon"
                    onClick={() => handleDeleteCompany(company.id)}
                    data-testid={`remove-company-${company.id}`}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};

export default CompaniesTable;
