import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";


    export class CategoryService extends BaseService<CategoryEntity>{
        constructor(){
            super(CategoryEntity)
        }

        async findAllCategory(): Promise<CategoryEntity[]> {
            return (await this.execRepository).find();
          }

          async findCategoryById(id: string): Promise<CategoryEntity | undefined> {
            const category: CategoryEntity | null = await (await this.execRepository)
                .createQueryBuilder('category')
                .where({ id })
                .getOne();
            if (!category) {
                throw new Error("Usuario no encontrado");
            }
        
            return category;
        }

        async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
            return (await this.execRepository).save(body);
          }
        
          async deleteCategory(id: string): Promise<DeleteResult> {
            return (await this.execRepository).delete({ id });
          }
        
          async updateCategory(id: string, infoUpdate: CategoryDTO): Promise<UpdateResult> {
            return (await this.execRepository).update(id, infoUpdate);
          }
    }