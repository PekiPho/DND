import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";


export interface AuthState{
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export const initialAuthState: AuthState={
    token: localStorage.getItem('access_token'),
    isLoading:false,
    error:null,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,

        on(AuthActions.login,AuthActions.register, (state)=>({
            ...state,
            isLoading:true,
            error:null,
        })),

        on(AuthActions.loginSuccess,AuthActions.registerSuccess, (state, {token}) =>({
            ...state,
            token,
            isLoading:false,
            error:null,
        })),

        on(AuthActions.loginFailure,AuthActions.registerFailure, (state, {error}) => ({
            ...state,
            isLoading:false,
            error,
        })),

        on(AuthActions.clearError, (state) => ({
            ...state,
            error: null,
        })),

        on(AuthActions.logout, ()=>({
            token:null,
            isLoading:false,
            error:null,
        })),
    ),
});