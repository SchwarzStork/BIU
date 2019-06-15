import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from "@angular/forms";
import { debounceTime } from 'rxjs/internal/operators';
import { User, Address, Consents } from './user'

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  let passwordControl = c.get('Password');
  let confirmPasswordControl = c.get('PasswordR');
  if (passwordControl.pristine || confirmPasswordControl.pristine)
    return null;
  if (passwordControl.value === confirmPasswordControl.value)
    return null;
  return { 'matchPasswords': true };
}

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  passwordMessages = {
    matchPasswords: "Passwords don't match.", pattern: "Password is invalid."
  };
  matchPasswordsMsg; passwordPatternMsg;
  userForm: FormGroup;
  userExists: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Surname: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required, Validators.minLength(3)]],
      Pet: ['', Validators.required],
      City: ['', Validators.required],
      Street: ['', Validators.required],
      Building: ['', Validators.required],
      FlatNo: [''],
      Newsletter: [''],
      SMS: [''],
      Phone: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(7), Validators.maxLength(9)]],
      pswdGroup: this.formBuilder.group({
        Password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)]],
        PasswordR: ['', [Validators.required]]

      }, { validator: passwordMatcher })

    });

    this.userForm.get('Username').valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      if (value === 'admin')
        this.userExists = true;
      else this.userExists = false;
    });
    let passwordGroup = this.userForm.get("pswdGroup");
    let password = this.userForm.get("pswdGroup.Password"); password.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.passwordPatternMsg = ''; if ((password.touched || password.dirty) && password.getError('pattern')) {
        this.passwordPatternMsg = this.passwordMessages['pattern'];
      }
    });
    let confirmPassword = this.userForm.get("pswdGroup.PasswordR"); confirmPassword.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.matchPasswordsMsg = '';
      if ((confirmPassword.touched || confirmPassword.dirty) && passwordGroup.getError('matchPasswords')) {
        this.matchPasswordsMsg = this.passwordMessages['matchPasswords'];
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      let address = new Address(
        this.userForm.get("City").value,
        this.userForm.get("Street").value,
        this.userForm.get("Building").value,
        this.userForm.get("FlatNo").value
      );

      let consents = new Consents(
        this.userForm.get("Newsletter").value,
        this.userForm.get("SMS").value
      );

      let user = new User(
        this.userForm.get("Name").value,
        this.userForm.get("Surname").value,
        this.userForm.get("Email").value,
        this.userForm.get("Phone").value,
        this.userForm.get("pswdGroup.Password").value,
        this.userForm.get("Pet").value,
        address,
        consents);

      console.log(user);
    }
    else {
      console.log("Invalid form!");
      return;
    }
  }
}
