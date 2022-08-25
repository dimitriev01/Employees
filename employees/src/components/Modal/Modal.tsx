import React from 'react';
import cl from './Modal.module.scss'

interface ModalProps {
    visible: boolean,
    setVisible(visible: boolean): void
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, visible, setVisible }) => {

    const rootClass = [cl['modal']]
    if (visible){
       rootClass.push(cl['modal_active'])
    }


    return (
        <div className={rootClass.join(' ')} >
            <div className={cl.modal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;