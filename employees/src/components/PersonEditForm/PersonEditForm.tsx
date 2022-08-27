import axios from 'axios';
import React, { useState } from 'react';
import { IPerson } from '../../interfaces';
import Btn from '../Btn/Btn';
import Input from '../Input/Input';
import cl from './PersonEditForm.module.scss'

interface PersonEditFormProps {
    choosedPerson: IPerson
    onUpdate(person: IPerson): void
}

const PersonEditForm: React.FC<PersonEditFormProps> = ({ choosedPerson }) => {
    const [personEdit, setPersonEdit] = useState<IPerson>(choosedPerson)

    const changePersonHandler = () => {
        axios.put('http://localhost:3001/persons/' + choosedPerson.id, {
            firstName: personEdit.firstName,
            lastName: personEdit.lastName
        })
    }

    return (
        <form className={cl.form}>
            <div className={cl.form__item}>
                <Input
                    value={personEdit?.firstName}
                    onChange={e => setPersonEdit({ ...personEdit, firstName: e.target.value })}
                    className={cl.form__item__input}
                    autoComplete="off"
                    placeholder="Введите имя сотрудника"
                />
            </div>

            <div className={cl.form__item}>
                <Input
                    value={personEdit?.lastName}
                    onChange={e => setPersonEdit({ ...personEdit, lastName: e.target.value })}
                    className={cl.form__item__input}
                    autoComplete="off"
                    placeholder="Введите фамилию сотрудника"
                />
            </div>

            <Btn onClick={changePersonHandler} className={cl.form__btn}>
                Сохранить
            </Btn>
        </form>
    );
};

export default PersonEditForm;