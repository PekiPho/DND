import{createActionGroup,emptyProps,props} from '@ngrx/store';
import { empty } from 'rxjs';


export const AuthActions = createActionGroup({
    source: 'Auth',
    events:{
        'Login': props<{username:string; password:string}>(),
        'Login Success': props<{token:string}>(),
        'Login Failure': props<{error:string}>(),


        'Register':props<{username:string; password:string}>(),
        'Register Success': props<{token:string}>(),
        'Register Failure': props<{error:string}>(),

        'Clear Error': emptyProps(),
        'Logout': emptyProps(),
    }
})