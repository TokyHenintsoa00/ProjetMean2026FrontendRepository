import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { FileUploadModule } from "primeng/fileupload";
import { FluidModule } from "primeng/fluid";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";

@Component({
    selector:'app-validationBoutique',
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        SelectModule,
        FluidModule,
        TextareaModule,
        FileUploadModule,
        DatePickerModule
    ],
    template:``
})
export class ValidationBoutique{
    
}