import React from 'react';
import cl from './Person.module.scss'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPerson } from '../../interfaces';

interface PersonProps {
    emp: IPerson
}

const Person: React.FC<PersonProps> = ({ emp }) => {
    return (
        <tr key={emp.id} className={cl.person}>
            <td className={cl.person__firstname}>{emp.firstName}</td>
            <td className={cl.person__lastname}>{emp.lastName}</td>
            <td>
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrashAlt} />
            </td>
        </tr>
    );
};

export default Person;