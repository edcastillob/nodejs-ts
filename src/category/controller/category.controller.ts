import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";



    export class CategoryController{
        constructor(
            private readonly _categoryService: CategoryService = new CategoryService()){}

        async getCategories(req: Request, res: Response) {
            try {
              const data = await this._categoryService.findAllCategory();
              return res.status(200).json(data);
            } catch (e) {
              console.error(e);
            }
          }
    
    
          async getCategoryById(req: Request, res: Response) {  
            const { id } = req.params;
            try {
              const data = await this._categoryService.findCategoryById(id);
              res.status(200).json(data)
            } catch (error) {
              console.log(error)   
            }    
          }

          async createCategory(req: Request, res: Response) {      
            try {
              const data = await this._categoryService.createCategory(req.body);
              res.status(200).json(data)
            } catch (error) {
              console.log(error)   
            }    
          }
         
          async updateCategory(req: Request, res: Response) {  
            const { id } = req.params;
            try {
              const data = await this._categoryService.updateCategory(id, req.body);
              if (data.affected !== 0) {
                const categoryUpdate = await this._categoryService.findCategoryById(id);
                res.status(200).json({"Category Updated: ": categoryUpdate}); 
            } else {
                res.status(404).json({ message: "Category no encontrda" }); 
            }
              res.status(200).json(data)
            } catch (error) {
              console.log(error)   
            }    
          }
         
          async deleteCategory(req: Request, res: Response) {  
            const { id } = req.params;
            try {
              const data = await this._categoryService.deleteCategory(id);
              res.status(200).json(data)
            } catch (error) {
              console.log(error)   
            }    
          }
    }