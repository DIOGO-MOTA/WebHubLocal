import React, { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

interface Icompany {
  id: string;
  name: string;
  cnpj: string;
  description: string;
}

interface ImodalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  updateCompany: Icompany;
  handleUpdateCompany: (company: Omit<Icompany, 'id'>) => void;
}

interface Updatecompany {
  name: string;
  cnpj: string;
  description: string;
}

const ModalUpdateCompany: React.FC<ImodalProps> = ({
  isOpen,
  setIsOpen,
  updateCompany,
  handleUpdateCompany,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: Updatecompany) => {
      handleUpdateCompany(data);

      setIsOpen();
    },
    [handleUpdateCompany, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={updateCompany}>
        <h1>Editar Empresa</h1>

        <Input name="name" />
        <Input name="cnpj" />

        <Input name="description" />

        <button type="submit" data-testid="edit-company-button">
          <div className="text">Editar Empresa</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalUpdateCompany;
