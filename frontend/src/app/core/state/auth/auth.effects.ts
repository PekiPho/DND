import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from "../../services/auth";
import { Router } from "@angular/router";
import { AuthActions } from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";


@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({username,password}) =>
                this.authService.login(username,password).pipe(
                    map((res) => AuthActions.loginSuccess({token: res.access_token})),
                    catchError((err)=>
                        of(
                            AuthActions.loginFailure({
                                error: err.error?.message || 'Login failed. Please check credentials.'
                            })
                        )
                    )
                )
            )
        )
    );

    register$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthActions.register),
            switchMap(({username,password}) =>
                this.authService.register(username,password).pipe(
                    map((res) => AuthActions.registerSuccess({token:res.access_token})),
                    catchError((err)=>
                        of(
                            AuthActions.registerFailure({
                                error: err.error?.message || 'Registration failed.'
                            })
                        )
                    )
                )
            )
        )
    );

    authSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess,AuthActions.registerSuccess),
            tap(()=>{
                this.router.navigate(['/dashboard']);
            })
        ), {dispatch:false});

    logout$ = createEffect(()=> this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(()=> {
            this.authService.logout();
            this.router.navigate(['/login'])
        })
    ), {dispatch:false});
}