import React, { useRef, useCallback, ChangeEvent } from 'react';
import * as Yup from 'yup';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

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

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAddress: (address: Omit<AddressProps, 'id'>) => void;
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

const ModalAddAddress: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAddress,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: UpdateAddress) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cep: Yup.string().required('Cep é Obrigatório'),
          city: Yup.string().required('Cidade é Obrigatório'),
          state: Yup.string().required('Estado é Obrigatório'),
          number: Yup.string().required('Número é Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        handleAddAddress(data);
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
          description: 'Ocorreu um erro ao fazer o cadastro da endereço.',
        });
      }
    },
    [handleAddAddress, setIsOpen, addToast],
  );

  const handleCep = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, '');

    fetch(`http://viacep.com.br/ws/${cep}/json/`).then(res =>
      res.json().then(datas => {
        formRef.current?.setFieldValue('city', datas.localidade);
        formRef.current?.setFieldValue('state', datas.uf);
        formRef.current?.setFieldValue('district', datas.bairro);
        formRef.current?.setFieldValue('street', datas.logradouro);
      }),
    );
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Endereço</h1>
        <Input name="cep" placeholder="Cep" onBlur={handleCep} />
        <Input name="city" placeholder="Cidade" />
        <Input name="state" placeholder="Estado" />
        <Input name="district" placeholder="Bairro" />
        <Input name="street" placeholder="Rua" />
        <Input name="number" placeholder="Numero" />
        <Input name="complement" placeholder="Complemento" />
        <button type="submit" data-testid="add-Endereço-button">
          <p className="text">Adicionar Endereço</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddAddress;
