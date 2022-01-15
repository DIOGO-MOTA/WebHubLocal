/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { FiEdit3, FiFilePlus, FiTrash2 } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Header from '../../components/Header';
import ModalAddAddress from '../../components/ModalAddAddress';

import ModalUpdateAddress from '../../components/ModalUpdateAddress';
import api from '../../services/api';

import { Container } from './styles';

interface AddressParams {
  id: string;
}

interface AddressProps {
  id: string;
  cep: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: number;
  complement: string;
}

const Address: React.FC = () => {
  const [data, setData] = useState<AddressProps[]>([]);

  const [updateAddress, setUpdateAddress] = useState<AddressProps>(
    {} as AddressProps,
  );
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const { params } = useRouteMatch<AddressParams>();

  useEffect(() => {
    async function fetchAddress(): Promise<void> {
      try {
        const response = await api.get(`/address/${params.id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAddress();
  }, [params]);

  async function handleDeleteAddress(id: string): Promise<void> {
    try {
      await api.delete(`/address/${id}`);

      setData(data.filter(address => address.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateAddress(
    address: Omit<AddressProps, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/address/${updateAddress.id}`, {
        ...updateAddress,
        ...address,
      });

      setData(
        data.map(mappedAddress =>
          mappedAddress.id === updateAddress.id
            ? { ...response.data }
            : mappedAddress,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddAddress(
    address: Omit<AddressProps, 'id'>,
  ): Promise<void> {
    try {
      const response = await api.post(`/address/${params.id}`, {
        ...address,
      });
      setData([...data, response.data]);
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

  function handleEditAddress(address: AddressProps): void {
    setUpdateAddress(address);
    toggleUpdateModal();
  }

  return (
    <>
      <ModalAddAddress
        isOpen={modalOpen}
        setIsOpen={openModal}
        handleAddAddress={handleAddAddress}
      />
      <ModalUpdateAddress
        isOpen={updateModalOpen}
        setIsOpen={toggleUpdateModal}
        updateAddress={updateAddress}
        handleUpdateAddress={handleUpdateAddress}
      />

      <Header />
      <Container>
        <Table>
          <Thead>
            <Tr>
              <Th>Cep</Th>
              <Th>Cidade</Th>
              <Th>Estado</Th>
              <Th>Bairro</Th>
              <Th>Rua</Th>
              <Th>Número</Th>
              <Th>Complemento</Th>
              <Th>Opções</Th>
              <Th>
                <button
                  type="button"
                  className="icon"
                  onClick={() => openModal()}
                  data-testid="criar-address"
                >
                  <FiFilePlus size={20} />
                </button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(address => (
              <Tr key={address.id}>
                <Td>{address.cep}</Td>
                <Td>{address.city}</Td>
                <Td>{address.state}</Td>
                <Td>{address.district}</Td>
                <Td>{address.street}</Td>
                <Td>{address.number}</Td>
                <Td>{address.complement}</Td>
                <Td>
                  <button
                    type="button"
                    className="icon"
                    onClick={() => handleEditAddress(address)}
                    data-testid={`edit-company-${address.id}`}
                  >
                    <FiEdit3 size={20} />
                  </button>
                </Td>
                <Td>
                  <button
                    type="button"
                    className="icon"
                    onClick={() => handleDeleteAddress(address.id)}
                    data-testid={`remove-company-${address.id}`}
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

export default Address;
