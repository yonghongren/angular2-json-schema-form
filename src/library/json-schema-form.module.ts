import { enableProdMode, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { JsonSchemaFormComponent } from './json-schema-form.component';
import { OrderableDirective } from './utilities/orderable.directive';

import { ALL_FRAMEWORKS } from '../frameworks/index';
import { ALL_WIDGETS } from '../widgets/index';
import { ALL_MATERIAL_DESIGN_WIDGETS } from '../frameworks/material-design/index';

import { FrameworkLibraryService } from '../frameworks/framework-library.service';
import { WidgetLibraryService } from '../widgets/widget-library.service';
import { JsonSchemaFormService } from './json-schema-form.service';

import 'ajv';
import 'lodash';

enableProdMode();
@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MaterialModule.forRoot()
  ],
  declarations: [
    JsonSchemaFormComponent, OrderableDirective,
    ...ALL_FRAMEWORKS, ...ALL_WIDGETS, ...ALL_MATERIAL_DESIGN_WIDGETS
  ],
  entryComponents: [
    ...ALL_FRAMEWORKS, ...ALL_WIDGETS, ...ALL_MATERIAL_DESIGN_WIDGETS
  ],
  exports: [
    JsonSchemaFormComponent
  ],
  providers: [
    FrameworkLibraryService, WidgetLibraryService, JsonSchemaFormService
  ],
})
export class JsonSchemaFormModule {
  static forRoot(): ModuleWithProviders { return {
    ngModule: JsonSchemaFormModule,
    providers: [
      FrameworkLibraryService, WidgetLibraryService, JsonSchemaFormService
    ]
  }; }
}