export default function logger(req, res, next){
    const start = Date.now();

    res.once("finish", ()=>{
          const ms = Date.now() - start
          const status = res.statusCode;
          const logType = status >= 400 ? "ERROR" : "SUCCESS";
         // console.log(`[${logType}] [${req.method}] ${req.originalUrl} ${status} - ${ms} ms ${req.ip} ${req.headers["user-agent"]}`);
          console.log(`[${logType}] [${req.method}] ${req.originalUrl} ${status} - ${ms} ms`)
    })
    next();
};