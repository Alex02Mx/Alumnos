import { config } from "./src/config/env.js";
import app from "./src/app.js";

app.listen(config.port, '0.0.0.0', () => {
  console.log("Servidor corriendo en puerto http://localhost:",config.port);
});
// === alumnos ===
// app.get("/alumnos", (req, res) => {
//     res.send(alumnoList);
// });

// app.post("/alumnos",(req, res) => {
//     try{
//         const {name, course} = req.body;
//         if (!name || !course){
//             return res.status(400).send("Todos los campos son obligatorios");
//         }
//         alumnoList.push({name: name, course: course});
//         res.status(201).send("Tarea guardada con exito");
//     } catch (error) {
//         res.status(500).send("Error interno del servidor");
//     }
// });
// ===========================================================
// const app = express();
// app.use(express.json());



// app.get("/", (req, res) => {
//   res.send("Hola mundo");
// });

// app.get("/saludo", (req, res) => {
//   res.send("Hola Luis");
// });

// === middleware global ===

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// })
// ===========================

// === middleware por ruta
// function auth(req, res, next){
//     if(req.query.key === "123"){
//         next()
//     } else {
//         res.send("No autorizado");
//     }
// }
// app.use("/privado", auth, (req, res) => {
//     res.send("Bienvenido")
// });
// ===========================



// app.get("/login", (req, res)=>{
//     res.send("Panel login");
// })
// app.get("/admin", (req, res) => {
//     res.send("Panel admin");
// })

// === usuarios ===



// app.post("/alumnos", (req, res) => {
//     console.log(req.body);
//     alumnoList.push(req.body)
//     res.json({
//         mensaje:"Alumno recibido",
//         datos:req.body
//     })
// });
// ===================

// === Suma ===
// let total;
// app.get("/suma", (req, res) => {
//     res.send(total ?? "Aun no hay suma");
// })
// app.post("/suma", (req, res) => {
//     console.log(req.body);
//     const operacion = req.body;
//     total = operacion.num1 + operacion.num2;
//     res.json({
//         mensaje: 'Operacion exitosa',
//         datos: operacion
//     })
// })
// ===================


