import axios from 'axios';
import React, { useState } from 'react';
import { IPerson } from '../../interfaces';
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
    const [personEdit, setPersonEdit] = useState<IPerson>(choosedPerson)

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (!personEdit?.firstName || !personEdit?.lastName) {
            notyf.error(`У сотрудника должны быть фамилия и имя`)
            return
        }
        const firstPerson = persons.find(p => personEdit.firstName === p.firstName && personEdit.lastName === p.lastName)
        if (personEdit.firstName === choosedPerson.firstName && personEdit.lastName === choosedPerson.lastName) {
            notyf.error('Вы ввели те же данные сотрудника')
            return;
        } else
            if (firstPerson) {
                notyf.error(`Такой сотрудник уже есть, он с id ${firstPerson.id}`)
                return;
            }

        axios.put('http://localhost:3001/persons/' + choosedPerson.id, {
            firstName: personEdit.firstName,
            lastName: personEdit.lastName
        })
            .then(() => {
                getPersons()
                setIsModalEditPerson(false)
                notyf.success(`Данные сотрудника ${choosedPerson.id} изменены`)
            })
            .catch(err => {
                notyf.error(`Не получилось изменить данные сотрудника ${err}`)
            })
        setPersonEdit({ ...personEdit, firstName: '', lastName: '' })
    }

    return (
        <form className={cl.form} onSubmit={submitFormHandler}>
            <div className={cl.form__item}>
                <Input
                    value={personEdit?.firstName}
                    onChange={e => setPersonEdit({ ...personEdit, firstName: e.currentTarget.value })}
                    className={cl.form__item__input}
                    autoComplete="off"
                    placeholder="Введите имя сотрудника"
                />
            </div>

            <div className={cl.form__item}>
                <Input
                    value={personEdit?.lastName}
                    onChange={e => setPersonEdit({ ...personEdit, lastName: e.currentTarget.value })}
                    className={cl.form__item__input}
                    autoComplete="off"
                    placeholder="Введите фамилию сотрудника"
                />
            </div>

            <Btn className={cl.form__btn}>
                Сохранить
            </Btn>
        </form>
    );
};

export default PersonEditForm;