import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export class Server {
  constructor(private port : number = 3000, private app : any = express()) {
  }

  public WithCorsSupport() : Server {
    this.app.use(cors());
    return this;
  }

  public WithHeaders() : Server {
    const port = this.port;
    this.app.use(function (req:any, res:any, next:any) {
      res.setHeader(`Access-Control-Allow-Origin`, `http://localhost:${port}`);
      res.setHeader(`Access-Control-Allow-Methods`, `POST`);
      res.setHeader(`Access-Control-Allow-Headers`, `X-Requested-With,content-type`);
      res.setHeader(`Access-Control-Allow-Credentials`, true);
      next();
    });
    return this;
  }

  public Initialize() : void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.get(`/`, (req : any, res : any) => res.send(`Hello World!`));
    this.app.listen(this.port, () => console.log(`Express server running on port ${this.port}`));
  }
}

new Server(3000).WithCorsSupport().WithHeaders().Initialize();