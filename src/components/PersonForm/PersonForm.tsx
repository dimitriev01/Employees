import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Btn from '../Btn/Btn';
import Input from '../Input/Input';
import cl from './PersonForm.module.scss';

interface PersonFormProps {
  onAdd(firstName: string, lastName: string): void
}

type Inputs = {
  firstName: string,
  lastName: string
};

const PersonForm: React.FC<PersonFormProps> = ({ onAdd }) => {

  const { register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    onAdd(data.firstName.trim(), data.lastName.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={cl.form__item}>
        <Input
          className={cl.form__item__input}
          autoComplete="off"
          {...register('firstName', {
            required: 'Имя сотрудника обязательно к заполнению',
          })}
          placeholder="Введите имя сотрудника"
        />
        {errors.firstName && <div className={cl.form__item__error}>{errors.firstName.message}</div>}
      </div>

      <div className={cl.form__item}>
        <Input
          className={cl.form__item__input}
          autoComplete="off"
          {...register('lastName', {
            required: 'Фамилия сотрудника обязательна к заполнению',
          })}
          placeholder="Введите фамилию сотрудника"
        />
        {errors.lastName && <div className={cl.form__item__error}>{errors.lastName.message}</div>}
      </div>

      <Btn type="submit" className={cl.form__btn}>
        Добавить
      </Btn>
    </form>
  );
};

export default PersonForm;