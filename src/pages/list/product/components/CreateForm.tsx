import React from 'react';
import { Form, Input, Modal } from 'antd';
import { TableListItem } from '../data';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as TableListItem;
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="添加产品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品名称"
          name="productName"
          rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品价格"
          name="productPrice"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品数量"
          name="productStock"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品描述"
          name="productDescription"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品图片"
          name="productIcon"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品状态"
          name="productStatus"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品类别"
          name="categoryType"
          // rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
