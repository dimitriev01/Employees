import React from 'react';
import { IPerson } from '../../interfaces';
import cl from './Modal.module.scss'

interface ModalProps {
    visible: boolean,
    setVisible(visible: boolean): void
    children: React.ReactNode,
    title: string,
    setChoosedPersonEdit?: (person: IPerson) => void
}

const Modal: React.FC<ModalProps> = ({ setChoosedPersonEdit, children, visible, setVisible, title }) => {

    const rootClass = [cl['modal']]

    const goToMainPageHandler = () => {
        setVisible(false);
        setChoosedPersonEdit?.(null!)
    }

    if (visible) {
        rootClass.push(cl['modal_active'])
    }

    return (
        <div className={rootClass.join(' ')} >
            <div className={cl.modal__content}>
                <div className={cl.title}>{title}</div>
                <div className={cl.back} onClick={goToMainPageHandler}>
                   Назад к списку
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;