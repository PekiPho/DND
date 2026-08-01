import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authFeature } from '../../core/state/auth/auth.reducer';
import { AuthActions } from '../../core/state/auth/auth.actions';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,AsyncPipe,NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loginForm = this.fb.nonNullable.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  isLoading$= this.store.select(authFeature.selectIsLoading);
  error$ = this.store.select(authFeature.selectError);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  onSubmit(): void{
    if(this.loginForm.valid){
      const {username, password} = this.loginForm.getRawValue();
      this.store.dispatch(AuthActions.login({username,password}));
    }
  }
}
