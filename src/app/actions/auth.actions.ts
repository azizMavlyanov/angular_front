import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';
// export const login = createAction('Login');
export const login = createAction(
    'Login',
    props<{user: User}>()
);
export const logout = createAction('Logout');