import {
    createReducer,
    createSetValueAction,
    setValueReducer,
} from '../../common/redux-helper';
// enum
export const Types = {
    SetValue: 'search/SetValue',
    FetchAutoComplete: 'search/FetchAutoComplete',
};

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
    fetchAutoComplete: keyword => ({
        type: Types.FetchAutoComplete,
        keyword,
    }),
};

// 상태 값 관리
const INITIAL_STATE = {
    keyword: '',
    autoCompletes: [],
};
const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});
export default reducer;