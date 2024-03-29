import express from 'express';
import morgan from "morgan";
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ConfigServer } from './config/config';
import { CategoryRouter } from './category/category.router';

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
        return [ 
            new UserRouter().router,
            new CategoryRouter().router,
         ]
    }



    public listen(){
        this.app.listen(this.port, () => {  
            console.log(`Server listening on port: ${this.port}`)
        })
    }
}

new ServerBootstrap()