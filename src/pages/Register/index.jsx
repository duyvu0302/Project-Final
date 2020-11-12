import React, { useState, useEffect } from "react";
import history from "../../util/history";
import { createLogin, checkAccountRegister } from "../../redux/actions";

import "./style.css";
import { Form, Input, message, Select, Checkbox, Button } from "antd";
import panner from "../../images/panner_logInOut.webp";
import { connect } from "react-redux";
const { Option } = Select;

function Register({ createLogin, checkAccountRegister, userList }) {
  const [form] = Form.useForm();

  useEffect(() => {
      if(userList[0] ==="y"){
        message.error('Tài khoản đã tồn tại');

      }
      
  },[userList]);

  const onFinish = (values) => {
    console.log("onFinish -> values", values);
    createLogin({
      email: values.email,
      password: values.password,
      nickname: values.nickname,
      address: values.address,
      phone: values.phone,
    });

  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="register-form">
      <img src={panner} alt="" />
      <div className="register-form-wrapper">
        <Form
          form={form}
          name="register"
          className="form-register"
          onFinish={(values) => onFinish(values)}
          initialValues={{
            prefix: "84",
          }}
          scrollToFirstError
        >
          <div>Email</div>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập đúng Email!",
              },
              {
                required: true,
                message: "Email không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>Mật khẩu</div>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
                min: 8,
                message: "Mật khẩu phải hơn 8 kí tự",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <div>Nhập lại mật khẩu</div>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "2 mật khẩu bạn đã nhập không trùng khớp!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div>Nick name</div>

          <Form.Item
            name="nickname"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>Địa chỉ</div>

          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ !",
              },
            ]}
          >
            <Input  />
          </Form.Item>
          <div>Số điện thoại</div>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input type='number'
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userList } = state.registerReducer;
  console.log("mapStateToProps -> userList", userList);
  return {
    userList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createLogin: (params) => dispatch(createLogin(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
