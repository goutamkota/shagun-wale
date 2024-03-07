import { Module } from "@nestjs/common";
import { AppService } from "../app.service";
import { UploadItemController } from "./upload-item/upload-item.controller";
import { UploadItemService } from "./upload-item/upload-item.service";
import { CreatePackageService } from "./create-package/create-package.service";
import { CreatePackageController } from "./create-package/create-package.controller";
import { CustomPackageController } from "./custom-package/custom-package.controller";
import { CustomPackageService } from "./custom-package/custom-package.service";

@Module({
  providers: [AppService, UploadItemService, CreatePackageService, CustomPackageService],
  controllers: [UploadItemController, CreatePackageController, CustomPackageController],
  exports: [CreatePackageService]
})
export class MenuModule {
}
