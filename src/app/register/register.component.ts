import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isBrowser: any;

  constructor(private fb: FormBuilder, private serviceRouter: Router, private usersService: UsersService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    })
    this.isBrowser = this.isBrowser = typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  }

  router = inject(Router);

  ngOnInit(): void {
    if (this.isBrowser) {
      const elem = document.getElementById("btn");
      if (elem != null) {
        elem.style.display = "none";
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData);
      this.usersService.registerUser(formData).subscribe(() => {
        console.log("success");
        this.router.navigate(['/login']);
      }, (error) => {
        console.log(error);
      })
    }
  }
}
