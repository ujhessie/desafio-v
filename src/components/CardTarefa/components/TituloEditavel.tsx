// TituloEditavel.tsx
import React from "react";

interface TituloEditavelProps {
    titulo: string;
    editando: boolean;
    setEditando: React.Dispatch<React.SetStateAction<boolean>>;
    novoTitulo: string;
    setNovoTitulo: React.Dispatch<React.SetStateAction<string>>;
    salvarTitulo: () => void;
}

export const TituloEditavel: React.FC<TituloEditavelProps> = ({
    titulo,
    editando,
    setEditando,
    novoTitulo,
    setNovoTitulo,
    salvarTitulo,
}) => {
    const handleBlur = () => {
        if (novoTitulo.trim() !== "") {
            salvarTitulo();
        } else {
            setNovoTitulo(titulo);
            setEditando(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleBlur();
        }
    };

    return (
        <div className='flex w-full '>
            {editando ? (
                <input
                    type='text'
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className='bg-zinc-800 text-zinc-300 border border-zinc-700  rounded focus:outline-none focus:border-none focus:bg-transparent overflow-hidden focus:shadow-outline text-[20px] md:text-[22px] lg:text-[24px] break-words w-full'
                    autoFocus
                />
            ) : (
                <h3
                    className='text-[20px] md:text-[22px] lg:text-[24px] cursor-pointer text-zinc-400 space  break-normal break-words flex-1 w-full '
                    onClick={() => setEditando(true)}
                >
                    {titulo}
                </h3>
            )}
        </div>
    );
};
