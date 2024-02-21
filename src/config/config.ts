import * as dotenv from 'dotenv';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'; 

export abstract class ConfigServer{
    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv,
        });
    }

    public getEnvironment(key: string){
        return process.env[key]
    }

    public getNumberEnv(n: string): number{
        return Number(this.getEnvironment(n))
    }

    public get nodeEnv(): string{
        return this.getEnvironment('NODE_ENV')?.trim() || '';
    }   

    public  createPathEnv(path: string): string{
        const arrEnv: Array<string> = ['env'];

        if(path.length > 0){
            const stringToArr = path.split('.');
            arrEnv.unshift(...stringToArr)
        }
        return `.${arrEnv.join('.')}`
    }

    public get typeORMConfig(): ConnectionOptions{
        return{
            type: 'mysql',
            host: this.getEnvironment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            database: this.getEnvironment('DB_DATABASE'),
            username: this.getEnvironment('DB_USERNAME'),
            password: this.getEnvironment('DB_PASSWORD'),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: false,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
        }
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
}