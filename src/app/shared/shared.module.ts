import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModulesModule } from './modules/modules.module';

@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ModulesModule],
})
export class SharedModule {}
