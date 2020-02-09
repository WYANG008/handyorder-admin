import React from 'react';
import { Form, Input, Modal, Upload } from 'antd';
import { TableListItem } from '../data';
import { string } from 'prop-types';
import {UploadFile} from 'antd/lib/upload/interface'
import ImgFile from './ImgFile';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
}


const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const [file, setFile] = React.useState<UploadFile[]>([]);

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue ={ ...(await form.validateFields()) as TableListItem, ...file[0].response.data};
    // fieldsValue.img = file[0].response.data;
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
          name="name"
          rules={[{ required: true, message: '请输入至少1个字符的规则描述！', min: 1 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品价格"
          name="price"
          rules={[{ required: true, message: '请输入数字！', min: 0 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品数量"
          name="stock"
          rules={[{ required: true, message: '请输入数字！', min: 0 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品描述"
          name="description"
          rules={[{ required: false, message: '请输入至少2个字符的规则描述！', min: 0 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品状态"
          name="status"
          rules={[{ required: false, message: '请输入至少2个字符的规则描述！', min: 0 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="产品类别"
          name="category"
          rules={[{ required: true, message: '请输入至少2个字符的规则描述！', min: 1 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>

      <ImgFile value={file} onChange={setFile}/>
    </Modal>
  );
};

export default CreateForm;
