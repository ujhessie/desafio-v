import React, { ChangeEvent } from "react";
import { iTarefa } from "../../../Contexts/TarefasContext";
// import { DataFormatter, SeletorStatus } from "./components";
interface DetalhesTarefaProps {
    dataCriacao: Date;
    dataConclusaoPrevista?: Date | null;
    status: iTarefa["status"];
    onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
// Componente para exibir o seletor de status
const SeletorStatus: React.FC<{
    status: iTarefa["status"];
    onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}> = ({ status, onStatusChange }) => {
    return (
        <select
            value={status}
            onChange={onStatusChange}
            className='bg-zinc-800 text-zinc-300 border border-zinc-700 rounded px-2 py-1'
        >
            <option value='pendente'>Pendente</option>
            <option value='em desenvolvimento'>Em Desenvolvimento</option>
            <option value='concluída'>Concluída</option>
        </select>
    );
};

export const DataFormatter: React.FC<{ data: Date }> = ({ data }) => {
    const formatarData = (data: Date): string => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const dataComparada = new Date(data);
        dataComparada.setHours(0, 0, 0, 0);

        const comparacoes = {
            hoje: hoje.getTime(),
            amanha: new Date(hoje).setDate(hoje.getDate() + 1),
            ontem: new Date(hoje).setDate(hoje.getDate() - 1),
        };

        if (dataComparada.getTime() === comparacoes.hoje) return "Hoje";
        if (dataComparada.getTime() === comparacoes.amanha) return "Amanhã";
        if (dataComparada.getTime() === comparacoes.ontem) return "Ontem";

        return dataComparada.toLocaleDateString();
    };

    return <span>{formatarData(data)}</span>;
};

const DetalhesTarefa: React.FC<DetalhesTarefaProps> = ({
    dataCriacao,
    dataConclusaoPrevista,
    status,
    onStatusChange,
}) => {
    return (
        <div className='flex md:gap-4 text-[12px] md:text-[14px] lg:text-[16px]  w-full  opacity-55 flex-row flex-wrap gap-2'>
            <p className='border border-zinc-800 py-2 px-3 rounded-md'>
                Criada em: <DataFormatter data={dataCriacao} />
            </p>
            <p className='border border-zinc-800 py-2 px-3 rounded-md'>
                Entregar: 
                {dataConclusaoPrevista ? (
                    <DataFormatter data={dataConclusaoPrevista} />
                ) : (
                    "Não definida"
                )}
            </p>

            <SeletorStatus status={status} onStatusChange={onStatusChange} />
        </div>
    );
};

export default DetalhesTarefa;
