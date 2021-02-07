import {
    createReducer,
    createSetValueAction,
    FETCH_KEY,
    setValueReducer,
} from '../../common/redux-helper';
// enum
export const Types = {
    SetValue: 'search/SetValue',
    FetchUser: 'user/FetchUser',
    FetchUpdateUser: 'user/FetchUpdateUser',
};

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
    fetchUser: name => ({ type: Types.FetchUser, name }),
    FetchUpdateUser: ({ user, key, value, fetchKey }) => ({
        type: Types.FetchUpdateUser,
        user,
        key,
        value,
        [FETCH_KEY]: fetchKey,
    }),
};

// 상태 값 관리
const INITIAL_STATE = {
    user: undefined,
};
const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});
export default reducer;