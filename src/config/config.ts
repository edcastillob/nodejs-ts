import * as dotenv from 'dotenv';

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
}