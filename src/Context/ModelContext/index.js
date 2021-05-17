import { createContext, useContext, useState } from "react";

const ModelContext = createContext(null);

export default function useModelContext() {
    return useContext(ModelContext);
}

export function ModalProvider({ children }) {
    const [modelOpen, setModelOpen] = useState({state:false, innerCompnent:<></>, title:""});
    return (
        <ModelContext.Provider value={{ modelOpen, setModelOpen }}>
            {children}
        </ModelContext.Provider>
    );
}
