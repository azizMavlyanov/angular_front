import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';
import { User } from '../models/user';

// export const initialLoginState = false;

// const _authReducer = createReducer(
//     initialLoginState,
//     on(login, (state) => true),
//     on(logout, (state) => false),
// );

export interface State {
    isLoggedIn: boolean;
    user: User;
}

export const initialLoginState: State = {
    isLoggedIn: false,
    user: new User()
};

const _authReducer = createReducer(
    initialLoginState,
    on(login, (state, { user }) => {
        return {isLoggedIn: true, user: user}
    }),
    on(logout, (state) => initialLoginState),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
  }