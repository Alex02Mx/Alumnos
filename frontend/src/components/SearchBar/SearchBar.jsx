import { useState, useEffect } from "react";

export default function SearchBar ({search, setSearch, setPage}) {
    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput); // From useAlumnos state
            setPage(1);             // From useAlumnos state
        }, 500);   // 500ms debounce
        
        return () => clearTimeout(timeout);
    }, [searchInput]);          // here state

    return (
        <div>
            <input
            type="text"
            placeholder="Buscar alumno..."
            value={searchInput}   // Here state
            onChange={(e) => setSearchInput(e.target.value)}  // Here state
            />

            <button onClick={() => {
                setSearchInput("");   // Here state
                setSearch("");   // From useAlumnos state
                setPage(1);   // From useAlumnos state
            }}>
                Limpiar
            </button>
        </div>
    )
}