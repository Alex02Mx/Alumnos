let grupo = [
    {salon : "Matematicas", grupo : "A",horario : "tarde"},
    {salon : "Biologia", grupo : "C",horario : "tarde"},
    {salon : "Geografia", grupo : "B",horario : "noche"}
]

const resultado = grupo.findIndex(a => a.salon == "Geografia")

console.log(resultado);
const deleted = grupo.splice(resultado, 1)
console.log(deleted[0]);
console.log(grupo);

let variableVacia;
let variableDatos = "Datos";

console.log(variableVacia || "prueba");