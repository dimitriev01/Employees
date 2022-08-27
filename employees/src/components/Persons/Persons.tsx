import React from 'react';
import { IPerson } from '../../interfaces';
import Person from '../Person/Person';
import cl from './Persons.module.scss'

type PersonsProps = {
    persons: IPerson[]
    onRemove: (id: number) => void
    setIsModalEditPerson: (opened: boolean) => void
    setChoosedPersonEdit: (person: IPerson) => void
}

const Persons: React.FC<PersonsProps> = ({ persons, onRemove, setIsModalEditPerson, setChoosedPersonEdit }) => {

    if (!persons.length) {
        return (<p>Сотрудников нет!</p>)
    }

    return (
        <table className={cl.table}>
            <thead>
                <tr className={cl.table__title}>
                    <th className={cl.table__title__firstname}>Имя</th>
                    <th className={cl.table__title__lastname}>Фамилия</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {persons && persons.map(person => {
                    return (
                        <Person
                            setChoosedPersonEdit={setChoosedPersonEdit}
                            setIsModalEditPerson={setIsModalEditPerson}
                            key={person.id}
                            person={person}
                            onRemove={onRemove}
                        />
                    )
                })}
            </tbody>
        </table>
    );
};

export default Persons;