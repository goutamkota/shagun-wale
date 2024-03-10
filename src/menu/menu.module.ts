import { Module } from '@nestjs/common';
import { UploadItemController } from './upload-item/upload-item.controller';
import { UploadItemService } from './upload-item/upload-item.service';
import { CreatePackageService } from './create-package/create-package.service';
import { CreatePackageController } from './create-package/create-package.controller';
import { CustomPackageController } from './custom-package/custom-package.controller';
import { CustomPackageService } from './custom-package/custom-package.service';
import { MenuService } from './menu.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UploadItemService, CreatePackageService, CustomPackageService, MenuService],
  controllers: [UploadItemController, CreatePackageController, CustomPackageController],
  exports: [CreatePackageService],
})
export class MenuModule {
}
