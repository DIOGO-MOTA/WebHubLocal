import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

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

interface ImodalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  updateAddress: AddressProps;
  handleUpdateAddress: (address: Omit<AddressProps, 'id'>) => void;
}

interface UpdateAddress {
  cep: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number: number;
  complement: string;
}

const ModalUpdateAddress: React.FC<ImodalProps> = ({
  isOpen,
  setIsOpen,
  updateAddress,
  handleUpdateAddress,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: UpdateAddress) => {
      handleUpdateAddress(data);

      setIsOpen();
    },
    [handleUpdateAddress, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={updateAddress}>
        <h1>Editar Endereço</h1>

        <Input name="cep" />
        <Input name="city" />
        <Input name="state" />
        <Input name="district" />
        <Input name="street" />
        <Input name="number" />
        <Input name="complement" />

        <button type="submit" data-testid="edit-company-button">
          <div className="text">Editar Endereço</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalUpdateAddress;
