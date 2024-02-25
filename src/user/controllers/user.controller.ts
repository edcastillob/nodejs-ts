import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor( private readonly _userService: UserService = new UserService()){}
  async getUsers(req: Request, res: Response) {
    try {
      const data = await this._userService.findAllUser();
      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
 
  async getUserById(req: Request, res: Response) {  
    const { id } = req.params;
    try {
      const data = await this._userService.findUserById(id);
      res.status(200).json(data)
    } catch (error) {
      console.log(error)   
    }    
  }
 
  async createUser(req: Request, res: Response) {      
    try {
      const data = await this._userService.createUser(req.body);
      res.status(200).json(data)
    } catch (error) {
      console.log(error)   
    }    
  }
 
  async updateUser(req: Request, res: Response) {  
    const { id } = req.params;
    try {
      const data = await this._userService.updateUser(id, req.body);
      if (data.affected !== 0) {
        const userUpdate = await this._userService.findUserById(id);
        res.status(200).json({"User Updated: ": userUpdate}); 
    } else {
        res.status(404).json({ message: "Usuario no encontrado" }); 
    }
      res.status(200).json(data)
    } catch (error) {
      console.log(error)   
    }    
  }
 
  async deleteUser(req: Request, res: Response) {  
    const { id } = req.params;
    try {
      const data = await this._userService.deleteUser(id);
      res.status(200).json(data)
    } catch (error) {
      console.log(error)   
    }    
  }
}