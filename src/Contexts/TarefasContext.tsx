/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";

export interface iTarefa {
    id: number;
    titulo: string;
    dataCriacao: Date;
    dataConclusaoPrevista: Date | null; // Atualizado para permitir null
    status: "pendente" | "em desenvolvimento" | "concluída";
}

interface TarefasContextProps {
    tarefas: iTarefa[];
    tarefasSelecionadas: Set<number>;
    adicionarTarefa: (tarefa: iTarefa) => void;
    removerTarefa: (id: number) => void;
    selecionarTarefa: (id: number) => void;
    removerTarefasSelecionadas: () => void;
    atualizarStatus: (id: number, status: iTarefa["status"]) => void;
    atualizarTitulo: (id: number, titulo: string) => void;
    atualizarStatusSelecionados: (status: iTarefa["status"]) => void;
}

const TarefasContext = createContext<TarefasContextProps | undefined>(
    undefined
);

const obterTarefasDoLocalStorage = (): iTarefa[] => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        try {
            const tarefasParse: iTarefa[] = JSON.parse(tarefasSalvas);
            return tarefasParse.map((tarefa) => ({
                ...tarefa,
                dataCriacao: new Date(tarefa.dataCriacao),
                dataConclusaoPrevista: tarefa.dataConclusaoPrevista
                    ? new Date(tarefa.dataConclusaoPrevista)
                    : null, // Atualizado para usar null
            }));
        } catch (error) {
            console.error("Erro ao parsear tarefas do localStorage", error);
            return [];
        }
    }
    return [];
};

export const TarefasProvider = ({ children }: { children: ReactNode }) => {
    const [tarefas, setTarefas] = useState<iTarefa[]>(
        obterTarefasDoLocalStorage()
    );
    const [tarefasSelecionadas, setTarefasSelecionadas] = useState<Set<number>>(
        new Set()
    );

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = (tarefa: iTarefa) => {
        setTarefas((prev) => [...prev, tarefa]);
    };

    const removerTarefa = (id: number) => {
        setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
        setTarefasSelecionadas((prev) => {
            const novasSelecionadas = new Set(prev);
            novasSelecionadas.delete(id);
            return novasSelecionadas;
        });
    };

    const selecionarTarefa = (id: number) => {
        setTarefasSelecionadas((prev) => {
            const novasSelecionadas = new Set(prev);
            if (novasSelecionadas.has(id)) {
                novasSelecionadas.delete(id);
            } else {
                novasSelecionadas.add(id);
            }
            return novasSelecionadas;
        });
    };

    const removerTarefasSelecionadas = () => {
        setTarefas((prev) =>
            prev.filter((tarefa) => !tarefasSelecionadas.has(tarefa.id))
        );
        setTarefasSelecionadas(new Set());
    };

    const atualizarStatus = (id: number, novoStatus: iTarefa["status"]) => {
        setTarefas((prev) =>
            prev.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, status: novoStatus } : tarefa
            )
        );
    };

    const atualizarTitulo = (id: number, novoTitulo: string) => {
        setTarefas((prev) =>
            prev.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, titulo: novoTitulo } : tarefa
            )
        );
    };

    const atualizarStatusSelecionados = (novoStatus: iTarefa["status"]) => {
        setTarefas((prev) =>
            prev.map((tarefa) =>
                tarefasSelecionadas.has(tarefa.id)
                    ? { ...tarefa, status: novoStatus }
                    : tarefa
            )
        );
        setTarefasSelecionadas(new Set());
    };

    return (
        <TarefasContext.Provider
            value={{
                tarefas,
                tarefasSelecionadas,
                adicionarTarefa,
                removerTarefa,
                selecionarTarefa,
                removerTarefasSelecionadas,
                atualizarStatus,
                atualizarTitulo,
                atualizarStatusSelecionados,
            }}
        >
            {children}
        </TarefasContext.Provider>
    );
};

export const useTarefas = (): TarefasContextProps => {
    const context = useContext(TarefasContext);
    if (!context) {
        throw new Error(
            "useTarefas deve ser usado dentro de um TarefasProvider"
        );
    }
    return context;
};
