import { useState } from "react";

export const Categorias = () => {
    const [checkedState, setCheckedState] = useState({
        catTodas: true,
        catPendentes: false,
        catDesenvolver: false,
    });

    const handleCheckboxChange = (id: string) => {
        if (id === "catTodas") {
            setCheckedState({
                catTodas: true,
                catPendentes: false,
                catDesenvolver: false,
            });
        } else {
            setCheckedState((prevState) => ({
                ...prevState,
                catTodas: false,
                [id]: !prevState[id as keyof typeof checkedState], // Usando asserção de tipo aqui
            }));
        }
    };

    const Tag = ({ texto, id }: { texto: string; id: string }) => {
        return (
            <div>
                <input
                    className='hidden'
                    type='checkbox'
                    id={id}
                    checked={checkedState[id as keyof typeof checkedState]}
                    onChange={() => handleCheckboxChange(id)}
                />
                <label
                    className='text-zinc-300 px-4 py-2 rounded-lg border border-zinc-300 block text-[12px] md:text-[14px] lg:text-[16px]'
                    htmlFor={id}
                >
                    {texto}
                </label>
            </div>
        );
    };

    return (
        <div className='categorias-tarefas flex flex-wrap gap-2 mb-4'>
            <Tag id='catTodas' texto='Todas as tarefas' />
            <Tag id='catPendentes' texto='Pendentes' />
            <Tag id='CatMaisRecente' texto='Mais recente' />
            <Tag id='catMaisDistante' texto='Mais distante' />
        </div>
    );
};
