import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/global.css"

import { Contexts } from "./Contexts/Contexts.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Contexts>
            <App />
        </Contexts>
    </React.StrictMode>
);
