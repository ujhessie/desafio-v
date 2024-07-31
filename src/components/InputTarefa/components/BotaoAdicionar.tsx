import React from "react";
import { Plus } from "lucide-react";

interface BotaoAdicionarProps {
    onClick: () => void;
    disabled: boolean;
}

export const BotaoAdicionar: React.FC<BotaoAdicionarProps> = ({
    onClick,
    disabled,
}) => {
    return (
        <button
            className={`flex gap-2 font-semibold text-white px-4 py-2 rounded-lg text-[14px] md:text-[16px] items-center cursor-pointer my-transition shadow-sm ${
                disabled
                    ? "bg-violet-600 cursor-not-allowed brightness-50"
                    : "bg-violet-600 "
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            Adicionar
            <Plus className='w-[20px] h-[20px]' />
        </button>
    );
};
