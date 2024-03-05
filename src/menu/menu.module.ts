import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { AppService } from '../app.service';

@Module({
  providers: [MenuService, AppService],
  controllers: [MenuController],
  exports: [MenuService]
})
export class MenuModule {
}
