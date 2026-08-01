import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../core/state/auth/auth.reducer';
import { AuthActions } from '../../core/state/auth/auth.actions';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink,AsyncPipe,NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit{
  private fb= inject(FormBuilder);
  private store= inject(Store);

  registerForm= this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });

  isLoading$ = this.store.select(authFeature.selectIsLoading);
  error$ = this.store.select(authFeature.selectError);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  onSubmit(): void{
    if(this.registerForm.valid){
      const {username,password} = this.registerForm.getRawValue();
      this.store.dispatch(AuthActions.register({username,password}));
    }
  }
}
