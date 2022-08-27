import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPerson } from '../../interfaces';
import cl from './MainPage.module.scss'
import Modal from '../../components/Modal/Modal';
import Btn from '../../components/Btn/Btn';
import PersonForm from '../../components/PersonForm/PersonForm';
import Persons from '../../components/Persons/Persons';
import PersonEditForm from '../../components/PersonEditForm/PersonEditForm';

const MainPage: React.FC = () => {
    const api = 'http://localhost:3001/persons';
    const [persons, setPersons] = useState<IPerson[]>([])
    const [isModalAddPerson, setIsModalAddPerson] = useState<boolean>(false)
    const [isModalEditPerson, setIsModalEditPerson] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [choosedPersonEdit, setChoosedPersonEdit] = useState<IPerson>(null!)

    const removeHandler = (id: number) => {
        const shoudRemove = window.confirm('Вы уверены, что хотите удалить сотрудника?')
        if (shoudRemove) {
            axios.delete(api + '/' + id)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    function changePerson(person: IPerson) {
        const index = persons.findIndex(p => {
            return p.id === person.id
        })
        setPersons(Object.assign([...persons], { [index]: person }))
    }

    const addPerson = (firstName: string, lastName: string) => {
        const newPerson: IPerson = {
            id: Date.now(),
            firstName,
            lastName
        }
        const isHasTheSamePerson = persons.find(person => person.firstName === newPerson.firstName && person.lastName === newPerson.lastName);
        if (isHasTheSamePerson) {
            alert('Такой сотрудник уже добавлен')
            return;
        }
        axios.post(api, newPerson)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
        setPersons(prev => [...prev, newPerson])
        setIsModalAddPerson(false)
    }

    useEffect(() => {
        setTimeout(() => {
            try {
                setIsLoading(true)
                axios.get(api)
                    .then(res => setPersons(res.data))
                setIsLoading(false)
            }
            catch (err) {
                setIsLoading(false);
                setIsError(true)
                console.log(err);
            }
        }, 1000)
    }, [persons])

    if (isError) {
        return (
            <div>Невозможно получить сотрудников. Сервер не отвечает.</div>
        )
    }

    return (
        <>
            {isLoading ?
                <div>Идет загрузка...</div>
                :
                <Persons
                    setIsModalEditPerson={setIsModalEditPerson}
                    setChoosedPersonEdit={setChoosedPersonEdit}
                    persons={persons}
                    onRemove={removeHandler}
                />
            }

            <Btn className={cl.add__btn} onClick={() => setIsModalAddPerson(true)}>Создать сотрудника</Btn>
            <Modal
                title='Создание сотрудника'
                visible={isModalAddPerson}
                setVisible={setIsModalAddPerson}
            >
                <PersonForm
                    onAdd={addPerson}
                />
            </Modal>

            <Modal
                title='Редактирование сотрудника'
                visible={isModalEditPerson}
                setVisible={setIsModalEditPerson}
            >
                <PersonEditForm
                    onUpdate={changePerson}
                    choosedPerson={choosedPersonEdit}
                />
            </Modal>
        </>
    );
};

export default MainPage;