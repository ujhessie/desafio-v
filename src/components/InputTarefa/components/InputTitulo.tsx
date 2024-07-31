import React, { ChangeEvent, KeyboardEvent } from "react";
import { ClipboardPlus } from "lucide-react";

interface InputTituloProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const InputTitulo: React.FC<InputTituloProps> = ({
    value,
    onChange,
    onKeyDown,
}) => {
    return (
        <div className='flex gap-4 items-center border rounded-md border-zinc-800 shadow-sm p-2 flex-1'>
            <label htmlFor='iTituloTarefa' className='cursor-pointer'>
                <ClipboardPlus className='text-8xl text-white' />
            </label>
            <input
                id='iTituloTarefa'
                className='bg-transparent border-transparent focus:shadow-outline focus:outline-none focus:border-none text-white p-2 text-[16px] w-full'
                type='text'
                placeholder='Digite sua tarefa...'
                value={value}
                autoComplete='false'
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    );
};
