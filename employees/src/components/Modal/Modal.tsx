import React from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Modal.module.scss'

interface ModalProps {
    visible: boolean,
    setVisible(visible: boolean): void
    children: React.ReactNode,
    title: string
}

const Modal: React.FC<ModalProps> = ({ children, visible, setVisible, title }) => {

    const rootClass = [cl['modal']]
    if (visible) {
        rootClass.push(cl['modal_active'])
    }


    return (
        <div className={rootClass.join(' ')} >
            <div className={cl.modal__content}>
                <div className={cl.title}>{title}</div>
                <div className={cl.back}>
                    <NavLink onClick={() => setVisible(false)} to='/' >Назад к списку</NavLink>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;