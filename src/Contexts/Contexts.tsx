import React from "react";
import { TarefasProvider } from "./TarefasContext";

interface iContexts {
    children: React.ReactNode;
}

export const Contexts: React.FC<iContexts> = ({ children }) => {
    return <TarefasProvider>{children}</TarefasProvider>;
};
