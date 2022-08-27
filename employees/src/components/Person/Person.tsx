import React from 'react';
import cl from './Person.module.scss'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPerson } from '../../interfaces';

interface PersonProps {
    person: IPerson
    setIsModalEditPerson: (opened: boolean) => void
    setChoosedPersonEdit: (person: IPerson) => void
    onRemove: (id: number) => void
}

const Person: React.FC<PersonProps> = ({ person, onRemove, setIsModalEditPerson, setChoosedPersonEdit }) => {

    const personEditHandler = () => {
        setIsModalEditPerson(true)
        setChoosedPersonEdit(person)
    }

    return (
        <tr key={person.id} className={cl.person}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td className={cl.person__tools}>
                <FontAwesomeIcon onClick={personEditHandler} icon={faEdit} />
                <FontAwesomeIcon onClick={e => onRemove(person.id)} icon={faTrashAlt} />
            </td>
        </tr>
    );
};

export default Person;