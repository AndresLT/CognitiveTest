import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/user";
import * as UserActions from './user.actions'

export interface UserState{
    users: User[]
    loading: boolean
    error: any
}

export const initialStateUsers: UserState = {
    users: [],
    loading: false,
    error: null
}

export const usersReducer = createReducer(
    initialStateUsers,
    on(UserActions.loadUsers, state => ({...state, loading: true})),
    on(UserActions.loadUsersSucess, (state, {users}) => ({...state, users, loading: true})),
    on(UserActions.loadUsersError, (state, {error}) => ({...state, error, loading: false})),

)