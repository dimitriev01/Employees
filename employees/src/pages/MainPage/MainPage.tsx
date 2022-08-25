import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPerson } from '../../interfaces';
import cl from './MainPage.module.scss'
import Person from '../../components/Person/Person';

const MainPage: React.FC = () => {
    const fakeApi = 'http://localhost:3001/employees';
    const [employees, setEmployees] = useState<IPerson[]>(null!)

    useEffect(() => {
        axios.get(fakeApi)
            .then(res => setEmployees(res.data))
    }, [])

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
                {employees && employees.map(emp => {
                    return (
                        <Person
                            key={emp.id}
                            emp={emp}
                        />
                    )
                })}
            </tbody>
        </table>

    );
};

export default MainPage;