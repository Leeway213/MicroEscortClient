import { FormGroup, FormBuilder } from "@angular/forms";
import { UserInfoService } from "../utils/user-info.service";



export class BaseModalComponent {
    validateForm: FormGroup;

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    update: () => Promise<boolean> | boolean | any;

}