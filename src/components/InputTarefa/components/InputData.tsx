import React, { ChangeEvent } from 'react';

interface InputDataProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    min: string;
}

export const InputData: React.FC<InputDataProps> = ({ value, onChange, min }) => {
    return (
        <div className='flex gap-4'>
            <input
                id='iDataTarefa'
                className='border-transparent shadow-sm text-[14px] text-zinc-400 rounded-lg py-3 px-4 pr-4 font-bold'
                type='date'
                placeholder='Digite sua tarefa...'
                value={value}
                onChange={onChange}
                min={min} // Define a data mínima
            />
        </div>
    );
};