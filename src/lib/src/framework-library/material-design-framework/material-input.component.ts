import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../../json-schema-form.service';

@Component({
  selector: 'material-input-widget',
  template: `
    <md-input-container
      [floatPlaceholder]="options?.floatPlaceholder || (options?.notitle ? 'never' : 'auto')"
      [style.width]="'100%'">
      <input mdInput #inputControl
        [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
        [attr.list]="'control' + layoutNode?._id + 'Autocomplete'"
        [attr.maxlength]="options?.maxLength"
        [attr.minlength]="options?.minLength"
        [attr.pattern]="options?.pattern"
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [disabled]="controlDisabled"
        [id]="'control' + layoutNode?._id"
        [name]="controlName"
        [placeholder]="options?.notitle ? options?.placeholder : options?.title"
        [required]="options?.required"
        [style.width]="'100%'"
        [type]="layoutNode?.type"
        [ngModel]="inputValue"
        (ngModelChange)="updateInputValue($event)">
      <span *ngIf="options?.fieldAddonLeft"
        md-prefix>{{options?.fieldAddonLeft}}</span>
      <span *ngIf="options?.fieldAddonRight"
        md-suffix>{{options?.fieldAddonRight}}</span>
      <md-hint *ngIf="options?.description && !options?.placeholder && formControl?.dirty"
        align="end">{{options?.description}}</md-hint>
    </md-input-container>`,
})
export class MaterialInputComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  private userInput: boolean = true;
  public  inputValue: string;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;
  autoCompleteList: string[] = [];
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    this.jsf.initializeControl(this);
  }

  get controlValue(){
    return this.inputValue;
  }

  set controlValue(value: string){
    this.userInput = false;
    this.updateInputValue(value);
    this.userInput = true;
  }

  public updateInputValue (value: string) {
    this.inputValue = value;
    if (this.userInput) {
      this.jsf.updateValue(this, value);
    }
  }
}
