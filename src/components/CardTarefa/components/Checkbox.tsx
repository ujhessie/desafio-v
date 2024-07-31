// Checkbox.tsx
import React from "react";
// import './Checkbox.css';

interface CheckboxProps {
    checked: boolean;
    onChange: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <div>
            <input
                className='custom-checkbox w-5 h-5 cursor-pointer p-4 accent-violet-600 '
                type='checkbox'
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};
