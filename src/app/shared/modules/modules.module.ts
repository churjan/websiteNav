import { NgModule } from '@angular/core';

import { ZorroAntdModule } from './zorro-antd.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  exports: [ZorroAntdModule, DragDropModule],
})
export class ModulesModule {}
