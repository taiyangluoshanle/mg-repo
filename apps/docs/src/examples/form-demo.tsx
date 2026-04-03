"use client";

import {
  Button,
  Form,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from "@mg/ui";

export const FormBasicDemo = () => {
  return (
    <Form className="w-full max-w-sm space-y-4">
      <FormField>
        <FormLabel>用户名</FormLabel>
        <Input placeholder="请输入用户名" />
      </FormField>
      <FormField>
        <FormLabel>邮箱</FormLabel>
        <Input type="email" placeholder="请输入邮箱" />
        <FormMessage>请填写有效的邮箱地址</FormMessage>
      </FormField>
      <Button type="submit">提交</Button>
    </Form>
  );
};
