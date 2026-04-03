"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mg/ui";

export const TableBasicDemo = () => {
  return (
    <Table className="w-full max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead>名称</TableHead>
          <TableHead>类型</TableHead>
          <TableHead>状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Button</TableCell>
          <TableCell>组件</TableCell>
          <TableCell>稳定</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Input</TableCell>
          <TableCell>表单</TableCell>
          <TableCell>稳定</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
