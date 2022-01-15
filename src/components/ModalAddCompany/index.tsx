import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface Icompany {
  id: string;
  name: string;
  cnpj: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddCompany: (company: Omit<Icompany, 'id'>) => void;
}

interface Addcompany {
  name: string;
  cnpj: string;
  description: string;
}

const ModalAddCompany: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddCompany,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: Addcompany) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da empresa é Obrigatório'),
          cnpj: Yup.string().min(14, 'CNPJ Inválido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        handleAddCompany(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Ocorreu um erro ao fazer o cadstro da empresa.',
        });
      }
    },
    [handleAddCompany, setIsOpen, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova empresa</h1>

        <Input name="name" placeholder="Nome: Empresa" />
        <Input name="cnpj" placeholder="CNPJ: 000.0000.0000-00" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-company-button">
          <p className="text">Adicionar Empresa</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddCompany;
