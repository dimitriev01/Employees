import React from 'react';
import cl from './Btn.module.scss'

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
    children: React.ReactNode;
}

const Btn: React.FC<BtnProps> = ({ className, onClick, children, ...props }) => {

    return (
        <button onClick={onClick} {...props} className={[cl.btn, className].join(' ')}>
            {children}
        </button >
    );
};

export default Btn;