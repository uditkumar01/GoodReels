import { createContext, useContext, useReducer } from "react";
import dataReducer from "../../Reducer/DataReducer";

const DataContext = createContext(null);

export default function useDataContext() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [dataState, dataDispatch] = useReducer(dataReducer, {
        videoData: [],
        playlistData: [],
    });
    return (
        <DataContext.Provider value={{ dataState, dataDispatch }}>
            {children}
        </DataContext.Provider>
    );
}
