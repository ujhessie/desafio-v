import { Footer } from "../../components/Footer/Footer";
import { InputTarefa } from "../../components/InputTarefa/InputTarefa";
import { CardTarefa } from "../../components/CardTarefa/CardTarefa";
import { useTarefas } from "../../Contexts/TarefasContext";
import { NavTarefas } from "../../components/NavTarefas/NavTarefas";

export const HomePage = () => {
    const { tarefas } = useTarefas();

    // Separando tarefas concluídas e não concluídas
    const tarefasPendentes = tarefas.filter(
        (tarefa) => tarefa.status !== "concluída"
    );
    const tarefasConcluidas = tarefas.filter(
        (tarefa) => tarefa.status === "concluída"
    );

    return (
        <div className='h-full max-w-[1400px] p-2 md:p-4 m-auto'>
            <main className='w-full h-[] flex flex-col gap-4 rounded-xl'>
                <div className='p-2 md:p-4 border rounded-xl border-zinc-900'>
                    <InputTarefa />
                </div>
                <hr className='my-4 opacity-20' />
                <div className='p-2 md:p-4 border rounded-xl border-zinc-900'>
                    <NavTarefas />
                    <div className='md:grid md:grid-cols-2 gap-8'>
                        <div className='tarefas flex flex-col gap-4 '>
                            {tarefasPendentes.map((tarefa) => (
                                <CardTarefa key={tarefa.id} {...tarefa} />
                            ))}
                        </div>
                        <hr className='my-4 opacity-20 md:hidden' />
                        <div className='tarefas-concluidas flex flex-col gap-4'>
                        
                            {tarefasConcluidas.map((tarefa) => (
                                <CardTarefa key={tarefa.id} {...tarefa} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
