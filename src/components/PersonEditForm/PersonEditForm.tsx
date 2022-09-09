import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IPerson } from '../../interfaces/IPerson';
import Btn from '../Btn/Btn';
import Input from '../Input/Input';
import cl from './PersonEditForm.module.scss'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

interface PersonEditFormProps {
    persons: IPerson[]
    getPersons: () => void
    setIsModalEditPerson: (isModalEditPerson: boolean) => void
    choosedPerson: IPerson
}

const PersonEditForm: React.FC<PersonEditFormProps> = ({ persons, getPersons, setIsModalEditPerson, choosedPerson }) => {
    const notyf = new Notyf();
    const [personEdit, setPersonEdit] = useState<IPerson>(null!)

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (!personEdit.firstName || !personEdit.lastName) {
            notyf.error('У сотрудника должны быть фамилия и имя')
            return
        }

        const firstPersonTheSamePerson = persons.find(p => personEdit.firstName === p.firstName && personEdit.lastName === p.lastName) || null
        if (firstPersonTheSamePerson) {
            notyf.error(`Такой сотрудник уже есть, он с id ${firstPersonTheSamePerson.id}`)
            return;
        }

        axios.put('http://localhost:3001/persons/' + choosedPerson.id, {
            firstName: personEdit.firstName,
            lastName: personEdit.lastName
        })
            .then(() => getPersons())
            .then(() => setIsModalEditPerson(false))
            .then(() => notyf.success(`Данные сотрудника с id ${choosedPerson.id} изменены`))
            .catch(err => {
                notyf.error(`Не получилось изменить данные сотрудника ${err}`)
            })
    }

    useEffect(() => {
        setPersonEdit(choosedPerson)
    }, [choosedPerson])

    return (
        <form className={cl.form} onSubmit={submitFormHandler}>
            <div className={cl.form__item}>
                <Input
                    name="firstName"
                    value={personEdit?.firstName || ''}
                    onChange={e => setPersonEdit({ ...personEdit, firstName: e.currentTarget.value })}
                    className={cl.form__item__input}
                    autoComplete="off"
                    placeholder="Введите имя сотрудника"
                />
            </div>

            <div className={cl.form__item}>
                <Input
                    name="lastName"
                    value={personEdit?.lastName || ''}
                    onChange={e => setPersonEdit({ ...personEdit, lastName: e.currentTarget.value })}
                    className={cl.form__item__input}
                    autoComplete="off"
                    placeholder="Введите фамилию сотрудника"
                />
            </div>

            <Btn type="submit" className={cl.form__btn}>
                Сохранить
            </Btn>
        </form>
    );
};

export default PersonEditForm;