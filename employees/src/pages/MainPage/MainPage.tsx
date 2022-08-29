import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPerson } from '../../interfaces';
import cl from './MainPage.module.scss'
import Modal from '../../components/Modal/Modal';
import Btn from '../../components/Btn/Btn';
import PersonForm from '../../components/PersonForm/PersonForm';
import Persons from '../../components/Persons/Persons';
import PersonEditForm from '../../components/PersonEditForm/PersonEditForm';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const MainPage: React.FC = () => {
    const notyf = new Notyf();
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
                .then(() => getPersons())
                .then(() => notyf.success(`Сотрудник c id ${id} удалён`))
                .catch(err => {
                    notyf.error(`Не получилось удалить сотрудника ${err}`)
                });
        }
    }

    const getPersons = async () => {
        await axios.get<IPerson[]>(api)
            .then(p => {
                const allPersons: IPerson[] = p.data;
                setPersons(allPersons)
            })
            .catch(err => {
                notyf.error(`Не получилось обновить данные с сервера ${err}`)
            });
    }

    const fetchPersons = () => {
        notyf.open({
            message: 'Загружаются данные...',
            background: 'orange'
        })
        setIsLoading(true)
        axios.get(api)
            .then(res => setPersons(res.data))
            .then(() => notyf.success('Данные с сервера загружены'))
            .then(() => setIsLoading(false))
            .catch(err => {
                notyf.error(`Не пришли данные сотрудников с сервера ${err}`)
                setIsError(true)
                setIsLoading(false);
            })
    }

    const addPerson = (firstName: string, lastName: string) => {
        const newPerson: IPerson = {
            id: Date.now(),
            firstName,
            lastName
        }
        const isHasTheSamePerson = persons.find(person => person.firstName === newPerson.firstName && person.lastName === newPerson.lastName);
        if (isHasTheSamePerson) {
            notyf.error(`Такой сотрудник уже добавлен, он с id ${isHasTheSamePerson.id}`)
            return;
        }
        axios.post(api + '/', newPerson)
            .then(res => {
                console.log(res.data);
                notyf.success(`Сотрудник добавлен`)
                getPersons();
                setIsModalAddPerson(false)
            })
            .catch(err => {
                notyf.error(`Не получилось добавить сотрудника ${err}`)
            });
    }

    useEffect(() => {
        fetchPersons()
    }, [])

    // useEffect(() => {
    //     console.log('persons изменилось')
    //     getPersons()
    // }, [persons])

    return (
        <>
            {
                isError ?
                    <p>Невозможно получить сотрудников! Сервер не отвечает!</p> :
                    isLoading ?
                        <p>Идет загрузка сотрудников...</p>
                        :
                        <>
                            <Persons
                                setIsModalEditPerson={setIsModalEditPerson}
                                setChoosedPersonEdit={setChoosedPersonEdit}
                                persons={persons}
                                onRemove={removeHandler}
                            />
                            <Modal
                                title='Редактирование сотрудника'
                                visible={isModalEditPerson}
                                setVisible={setIsModalEditPerson}
                                setChoosedPersonEdit={setChoosedPersonEdit}
                            >
                                <PersonEditForm
                                    setIsModalEditPerson={setIsModalEditPerson}
                                    choosedPerson={choosedPersonEdit}
                                    getPersons={getPersons}
                                    persons={persons}
                                />
                            </Modal>
                        </>
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
        </>
    );
};

export default MainPage;
