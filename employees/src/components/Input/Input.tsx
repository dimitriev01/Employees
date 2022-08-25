import React from 'react';
import cl from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    disabled?: boolean,
    className?: string,
    ref?: React.ForwardedRef<HTMLInputElement>
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, disabled, ...otherProps }, ref) => {

    return (
        <input
            disabled={disabled}
            className={[cl.input, className].join(" ")}
            {...otherProps}
            ref={ref}
        />
    );
});

export default Input;