import React from 'react';
import cl from './Person.module.scss';
import { faEdit, faTrashAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPerson } from '../../interfaces/IPerson';

interface PersonProps {
  person: IPerson
  setIsModalEditPerson: (opened: boolean) => void
  setChoosedPersonEdit: (person: IPerson) => void
  onRemove: (id: number) => void
}

const Person: React.FC<PersonProps> = ({ person, onRemove, setIsModalEditPerson, setChoosedPersonEdit }) => {

  const personEditHandler = () => {
    setIsModalEditPerson(true);
    setChoosedPersonEdit(person);
  };

  return (
    <tr key={person.id} className={cl.person}>
      <td><FontAwesomeIcon icon={faUser} /></td>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td className={cl.person__tools}>
        <FontAwesomeIcon onClick={personEditHandler} icon={faEdit} />
        <FontAwesomeIcon onClick={() => onRemove(person.id)} icon={faTrashAlt} />
      </td>
    </tr>
  );
};

export default Person;