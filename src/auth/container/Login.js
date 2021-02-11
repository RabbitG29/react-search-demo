import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Form, Input, Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthLayout from '../component/AuthLayout'
import useBlockLoginUser from '../hook/useBlockLoginUser'
import { actions } from '../state'

export default function Login() {
    useBlockLoginUser();
    const dispatch = useDispatch()
    function onFinish({username, password}) {
        dispatch(actions.fetchLogin(username, password))
    }

    return (
        <AuthLayout onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input autoFocus prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                >
                    Log in
                </Button>
                Or <Link to="/signup">register now!</Link>
            </Form.Item>
        </AuthLayout>
    )
}