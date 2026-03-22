import http from "http";

let user = {
    nombre: "Luis",
    edad: 45,
    ciudad: "Leon"
};

let products = [
    { id: 1, "nombre": "Laptop" },
    { id: 2, "nombre": "Mouse" }
];

function notPermited(res){
    res.writeHead(405, {"Content-Type": "application/json"});
    res.end(JSON.stringify({error: "Metodo no permitido"}));
}
function notFound(res){
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({error: "Ruta no encontrada"}));
}
function sendJSON(res, data){
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    if(url.pathname === "/"){
        res.end("Home");
    }
    else if(url.pathname === "/saludo"){
        res.end("Hola Luis");
    }
    else if(url.pathname === "/edad"){
        res.end("Tienes 45");
    }
    else if(url.pathname === "/usuario"){
        sendJSON(res, user)
    }
    else if(url.pathname === "/status"){
        const verbose = url.searchParams.get("verbose")

        const statusObj = {
            "status": "ok",
            "server": "running",
            "time": new Date()
        };

        if(verbose === "true"){
            sendJSON(res, statusObj)
        }
        else {
            const {status, server} = statusObj;
            sendJSON(res, {status, server})
        }
    }
    else if(url.pathname === "/productos"){

        // ========= GET =========
        if(req.method === "GET"){
            const id = url.searchParams.get("id");
            if(id){
                const product = products.find(item => item.id == id );
                return product ? sendJSON(res, product) : notFound(res);
            }
            return sendJSON(res, products)
        }
        // ========= DELETE =========
        else if(req.method === "DELETE"){
            const id = url.searchParams.get("id");
            if(!id){
                return sendJSON(res, {error:"ID requerido"});
            }

            const index = products.findIndex(p => p.id == id);
            if(index === -1){
                return notFound(res);
            }

            const deleted = products.splice(index, 1);

            return sendJSON(res, {
                mensaje: "Producto eliminado",
                producto: deleted[0]
            })
        }
        // ========= POST =========
        else if(req.method === "POST"){
            let body = "";

            req.on("data", chuck => {
                body += chuck;
                
                if(body.length > 1e6){
                    req.connection.destroy();
                }
            });

            req.on("end", () => {
                let nuevoProducto;

                try{
                    nuevoProducto = JSON.parse(body);
                }
                catch{
                    return sendJSON(res, {error:"JSON invalido"});
                }
                
                if(!nuevoProducto.nombre){
                    return sendJSON(res,{error:"Nombre requerido"})
                }

                nuevoProducto.id = products.lenght + 1;
                products.push(nuevoProducto);

                res.writeHead(201, { "Content-Type": "application/json" });

                res.end(JSON.stringify({ 
                mensaje: "Guardado", 
                producto: nuevoProducto 
                }));
            })
        }

        else {
            notPermited();
        }

    }
    else{
        notFound(res)
    }
});

server.listen(3000, () => {
    console.log("Servidor activo en http://localhost:3000");
});

