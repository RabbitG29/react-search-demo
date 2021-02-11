import React, { useEffect } from 'react';
import Search from './search/container/Search'
import User from './user/container/User'
import 'antd/dist/antd.css'
import { Route } from 'react-router-dom';
import Login from './auth/container/Login';
import Signup from './auth/container/Signup';
import { useDispatch } from 'react-redux';
import { actions as authActions } from './auth/state'

export default function App() {
  useEffect(() => {
    const bodyEl = document.getElementsByTagName('body')[0];
    const loadingEl = document.getElementById('init-loading');
    bodyEl.removeChild(loadingEl);
  }, []);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authActions.fetchUser())
  }, [dispatch]) // mount될 때만 호출됨
  return (
    <>
      <Route exact path="/" component={Search} />
      <Route path="/user/:name" component={User} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </>
  )
}
