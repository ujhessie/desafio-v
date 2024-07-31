import React, {
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
    dataConclusaoPrevista?: Date;
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
        const tarefasParse = JSON.parse(tarefasSalvas);
        return tarefasParse.map((tarefa: any) => ({
            ...tarefa,
            dataCriacao: new Date(tarefa.dataCriacao),
            dataConclusaoPrevista: tarefa.dataConclusaoPrevista
                ? new Date(tarefa.dataConclusaoPrevista)
                : undefined,
        }));
    }
    return [];
};

export const TarefasProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [tarefas, setTarefas] = useState<iTarefa[]>(
        obterTarefasDoLocalStorage()
    );
    const [tarefasSelecionadas, setTarefasSelecionadas] = useState<Set<number>>(
        new Set()
    );

    useEffect(() => {
        localStorage.setItem(
            "tarefas",
            JSON.stringify(
                tarefas.map((tarefa) => ({
                    ...tarefa,
                    dataCriacao: tarefa.dataCriacao.toISOString(),
                    dataConclusaoPrevista:
                        tarefa.dataConclusaoPrevista?.toISOString(),
                }))
            )
        );
    }, [tarefas]);

    const selecionarTarefa = (id: number) => {
        setTarefasSelecionadas((prevSelecionadas) => {
            const newSelecionadas = new Set(prevSelecionadas);
            if (newSelecionadas.has(id)) {
                newSelecionadas.delete(id);
            } else {
                newSelecionadas.add(id);
            }
            return newSelecionadas;
        });
    };

    const atualizarStatusSelecionados = (status: iTarefa["status"]) => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefasSelecionadas.has(tarefa.id)
                    ? { ...tarefa, status }
                    : tarefa
            )
        );
        // Limpar seleção após atualização
        setTarefasSelecionadas(new Set());
    };

    const adicionarTarefa = (tarefa: iTarefa) => {
        setTarefas((prevTarefas) => [...prevTarefas, tarefa]);
    };

    const removerTarefa = (id: number) => {
        setTarefas((prevTarefas) =>
            prevTarefas.filter((tarefa) => tarefa.id !== id)
        );
    };

    const removerTarefasSelecionadas = () => {
        setTarefas((prevTarefas) =>
            prevTarefas.filter((tarefa) => !tarefasSelecionadas.has(tarefa.id))
        );
        setTarefasSelecionadas(new Set());
    };

    const atualizarStatus = (id: number, status: iTarefa["status"]) => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, status } : tarefa
            )
        );
    };

    const atualizarTitulo = (id: number, titulo: string) => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, titulo } : tarefa
            )
        );
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

export const useTarefas = () => {
    const context = useContext(TarefasContext);
    if (!context) {
        throw new Error("useTarefas must be used within a TarefasProvider");
    }
    return context;
};
