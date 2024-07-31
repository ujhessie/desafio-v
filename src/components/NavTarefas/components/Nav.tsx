import { Trash2 } from 'lucide-react';

export const Nav = ({
    podeApagar,
    onApagar,
    onStatusChange,
}: {
    podeApagar: boolean;
    onApagar: () => void;
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
    return (
        <div className='flex gap-4'>
            <select
                className='bg-zinc-800  border border-zinc-700 rounded px-2 py-1 flex-1 text-zinc-300 text-[14px] brightness-50 font-medium cursor-not-allowed'
                onChange={onStatusChange}
                disabled={!podeApagar}
            >
                <option value='pendente'>Pendente</option>
                <option value='em desenvolvimento'>Em Desenvolvimento</option>
                <option value='concluída'>Concluída</option>
            </select>
            <button
                className={`text-zinc-300 text-[14px] brightness-50 font-medium cursor-not-allowed ${
                    podeApagar ? "text-red-400 bg-zinc-800 brightness-100 cursor-pointer" : "bg-zinc-800 cursor-not-allowed"
                } px-4 py-4 rounded`}
                onClick={podeApagar ? onApagar : undefined}
                disabled={!podeApagar}
            >
                <Trash2 />
            </button>
        </div>
    );
};
