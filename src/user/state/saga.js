import { all, call, put, takeEvery } from "redux-saga/effects";
import { actions, Types } from "./index";
import { callApi } from "../../common/util/api";
import { deleteApiCache, makeFetchSaga } from "../../common/util/fetch";

function* fetchUser({ name }) {
    const {isSuccess, data} = yield call(callApi, {
        url: '/user/search',
        params: { keyword: name },
    });

    if(isSuccess && data) {
        const user = data.find(item => item.name === name);
        if(user) {
            yield put(actions.setValue('user', user))
        }
    }
}

function* fetchUpdateUser({ user, key, value }) {
    const oldValue = user[key];
    yield put(actions.setValue('user', {...user, [key]: value}))
    const { isSuccess, data } = yield call(callApi, {
        url: '/user/update',
        method: 'post',
        data: { name: user.name, key, value, oldValue},
    });
    if(isSuccess && data) {
        // autoComplete의 캐시를 지워줘야 함
        deleteApiCache();
    } else {
        yield put(actions.setValue('user', user));
    }
}

export default function* () {
    yield all([
        takeEvery(
            Types.FetchUser,
            // 사가 미들웨어 <-> makeFetchSage <-> 사가 함수 흐름
            makeFetchSaga({ fetchSaga: fetchUser, canCache: true }),
        ),
        takeEvery(
            Types.FetchUpdateUser,
            makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false }),
        )
    ])
}