import { UserService } from "../../services/user.service";
import { isUsernameExistsValidator } from "./utils/UserValidator";
import { FormControl, Validators } from "@angular/forms";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatFormField } from "@angular/material";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  providers: [UserService]
})
export class SignupComponent implements OnInit {

  isUserExists: boolean;

  usernameFormControl = new FormControl("", [Validators.required]);

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

  async onUsernameChanged(e: any) {
    if (e.srcElement.value === "") {
      return;
    }
    const result = await this.userService.validateUsername(e.srcElement.value);
    if (result.ok) {
      const resultObj = result.json();
      if (resultObj.code === 1) {
        this.usernameFormControl.setErrors({
          isUserExists: true
        });
      }
    }
  }
}
