import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthLayout from '../component/AuthLayout'
import useBlockLoginUser from '../hook/useBlockLoginUser'
import { actions } from '../state'

export default function Signup() {
    useBlockLoginUser();
    const dispatch = useDispatch()
    function onFinish({name}) {
        const email = `${name}${EMAIL_SUFFIX}`
        dispatch(actions.fetchSignup(email))
    }

    return (
        <AuthLayout onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email',
                    }
                ]}
            >
                <Input autoFocus addonAfter={EMAIL_SUFFIX} placeholder="" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    인증 메일 받기
                </Button>
                Or <Link to="/login">login</Link>
            </Form.Item>
        </AuthLayout>
    )
}

const EMAIL_SUFFIX = '@company.com'