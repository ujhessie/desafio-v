// CardTarefa.tsx
import { Trash2 } from "lucide-react";
import React, { useState, useEffect, ChangeEvent } from "react";
import { iTarefa, useTarefas } from "../../Contexts/TarefasContext";
import { Checkbox, TituloEditavel } from "./components";
import DetalhesTarefa from "./components/DetalhesTarefa";

// Componente principal CardTarefas
export const CardTarefa: React.FC<iTarefa> = ({
    id,
    titulo,
    dataCriacao,
    dataConclusaoPrevista,
    status,
}) => {
    const {
        removerTarefa,
        atualizarStatus,
        atualizarTitulo,
        selecionarTarefa,
        tarefasSelecionadas,
    } = useTarefas();
    const [editando, setEditando] = useState(false);
    const [novoTitulo, setNovoTitulo] = useState(titulo);
    const [selecionada, setSelecionada] = useState(false);

    useEffect(() => {
        setSelecionada(tarefasSelecionadas.has(id));
    }, [tarefasSelecionadas, id]);

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        atualizarStatus(id, event.target.value as iTarefa["status"]);
    };

    const salvarTitulo = () => {
        atualizarTitulo(id, novoTitulo);
        setEditando(false);
    };

    const handleCheckboxChange = () => {
        selecionarTarefa(id);
    };

    // Determina a classe de fundo com base no status
    const backgroundColorClass = status === "concluída"
        ? "border border-green-900 bg-zinc-900 opacity-50" 
        : status === "em desenvolvimento"
        ? "border-blue-500/25 bg-zinc-900"
        : selecionada
        ? "bg-zinc-900 shadow-sm  bg-blue-600/35"
        : "bg-zinc-900";

    return (
        <div
            className={`rounded-lg p-4 flex flex-row justify-between items-center gap-4 border-4 border-zinc-800 text-zinc-300 ${backgroundColorClass}`}
        >
            <div className='flex items-center gap-6 w-full'>
                <Checkbox
                    checked={selecionada}
                    onChange={handleCheckboxChange}
                />
                <div className='flex flex-col gap-3 w-full max-w-[100%]'>
                    <TituloEditavel
                        titulo={titulo}
                        editando={editando}
                        setEditando={setEditando}
                        novoTitulo={novoTitulo}
                        setNovoTitulo={setNovoTitulo}
                        salvarTitulo={salvarTitulo}
                    />
                    <DetalhesTarefa
                        dataCriacao={dataCriacao}
                        dataConclusaoPrevista={dataConclusaoPrevista}
                        status={status}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            </div>
            <div className='p-4 text-red-300 bg-zinc-800 rounded-lg hover:cursor-pointer'>
                <Trash2 onClick={() => removerTarefa(id)} />
            </div>
        </div>
    );
};
