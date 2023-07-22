'use client';

import { useContext, useState } from 'react'
import React from 'react';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { Eye, Mail } from 'react-feather';

import { AuthContext } from '../contexts/AuthContext'


import styled from 'styled-components';

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;


const Login: React.FC = () => {
  const {signIn} = useContext(AuthContext)

  const [loading,setLoading] = useState(false)

  const onFinish = async (values: any) => {
  await signIn(values);
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <Row
  align="middle"
  justify="center"
  className="px-3 bg-white mh-page"
  style={{ minHeight: '100vh' }}
>
<Content>

  <Form
    layout='vertical'
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input 
      prefix={
        <Mail
          size={16}
          strokeWidth={1}
          style={{ color: 'rgba(0,0,0,.25)' }}
        />
      }
      placeholder="Username"
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input
        prefix={
          <Eye
            size={16}
            strokeWidth={1}
            style={{ color: 'rgba(0,0,0,.25)' }}
          />
        }
        type="password"
        placeholder="Password"
      />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" block className="mt-3">
        Log In
      </Button>
    </Form.Item>
  </Form>
  </Content>
  </Row>
  )
}
;

export default Login

