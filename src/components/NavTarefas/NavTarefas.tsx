import { useTarefas } from "../../Contexts/TarefasContext";
import { Nav } from "./components";

export const NavTarefas = () => {
    const {
        tarefasSelecionadas,
        removerTarefasSelecionadas,
        atualizarStatusSelecionados,
    } = useTarefas();

    const handleApagarTarefas = () => {
        removerTarefasSelecionadas();
    };

    const handleStatusChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const novoStatus = event.target.value as
            | "pendente"
            | "em desenvolvimento"
            | "concluída";
        atualizarStatusSelecionados(novoStatus);
    };

    return (
        <div className='flex flex-col md:flex-row gap-1  mb-4'>
            {/* <Categorias /> */}
            <Nav
                podeApagar={tarefasSelecionadas.size > 0}
                onApagar={handleApagarTarefas}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};
