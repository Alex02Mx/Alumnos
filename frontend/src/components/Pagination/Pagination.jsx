
export default function Pagination ({page, setPage, totalPages}){
    return (
        <div>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))}   
                    disabled = {page === 1}> {/* From useAlumnos state */}
            Anterior
            </button>

            <span>Página {page} de {totalPages}</span>  {/* From useAlumnos state */}

            <button onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled ={page === totalPages}>   {/* From useAlumnos state */}
            Siguiente
            </button>
        </div>
    )
}