import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { signUpData } from './login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // inject LoginService
  private loginService = inject(LoginService);

  firstName ='';
  lastName = '';
  emailId = '';
  password = '';
  age = 0;
  about = '';
  skills = '';

  onClickToAddData() {
    console.log("value", this.skills);
    let skillArray = this.skills.split(',').map(skill=> skill.trim());
    const signUpObject: signUpData = {
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      password: this.password,
      age: this.age,
      about: this.about,
      skills: skillArray
    }
    console.log("data", signUpObject);
    this.loginService.addUserData(signUpObject);
  }
}
