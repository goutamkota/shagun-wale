import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { AppService } from "../app.service";

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    AppService]
})
export class CategoryModule {
}
