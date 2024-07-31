import  { useState, ChangeEvent, KeyboardEvent } from "react";
import { useTarefas } from "../../Contexts/TarefasContext";
import "./style.css";
import { InputTitulo, InputData, BotaoAdicionar } from "./components";

// Função auxiliar para obter a data atual no formato YYYY-MM-DD
const getCurrentLocalDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const InputTarefa = () => {
    const { adicionarTarefa } = useTarefas();
    const [titulo, setTitulo] = useState<string>("");
    const [dataConclusaoPrevista, setDataConclusaoPrevista] = useState<string>(
        getCurrentLocalDate()
    );

    const handleAdicionarTarefa = () => {
        if (titulo) {
            const dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0); // Define o horário para meia-noite

            adicionarTarefa({
                id: Date.now(), // Esse ID pode permanecer como está, pois não interfere no tipo Date
                titulo,
                dataCriacao: dataAtual, // Use a instância de Date diretamente
                dataConclusaoPrevista: new Date(
                    `${dataConclusaoPrevista}T00:00:00`
                ),
                status: "pendente" as const,
            });
            resetFields();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAdicionarTarefa();
        }
    };

    const resetFields = () => {
        setTitulo("");
        setDataConclusaoPrevista(getCurrentLocalDate());
    };

    return (
        <div className='bg-zinc-900 rounded-xl p-2 md:p-4 flex flex-col md:flex-row justify-between gap-4 md:gap-8 shadow-xl'>
            <InputTitulo
                value={titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitulo(e.target.value)
                }
                onKeyDown={handleKeyDown}
            />
            <div className='flex justify-between gap-4'>
                <InputData
                    value={dataConclusaoPrevista}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDataConclusaoPrevista(e.target.value)
                    }
                    min={getCurrentLocalDate()}
                />
                <BotaoAdicionar onClick={handleAdicionarTarefa} disabled={!titulo} />
            </div>
        </div>
    );
};
