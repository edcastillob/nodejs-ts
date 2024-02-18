import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import { UserRouter } from './router/user.router';
import { ConfigServer } from './config/config';
import { Connection, createConnection } from 'typeorm';

class ServerBootstrap extends ConfigServer{
    public app: express.Application = express();
    private port:number = this.getNumberEnv('PORT') || 3000;
    
    constructor(){
        super()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());  
        this.dbConnect();
        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router>{
        return[ new UserRouter().router ]
    }

    public async dbConnect(): Promise<Connection> {
        try {
            const connection = await createConnection(this.typeORMConfig);
            console.log('Conexión a la base de datos establecida correctamente.');
            return connection;
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error; 
        }
    }

    public listen(){
        this.app.listen(this.port, () => {  
            console.log(`Server listening on port: ${this.port}`)
        })
    }
}

new ServerBootstrap()