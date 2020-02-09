import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { TableListItem } from '../data';
import {UploadFile} from 'antd/lib/upload/interface'
import ImgFile from './ImgFile'

export interface FormValueType extends Partial<TableListItem> {
  name: string;
  description: string;
  price: number;
  stock: number;
  status: number;
  category: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    name: props.values.name || "",
    price: props.values.price || 0,
    stock: props.values.stock || 0,
    status: props.values.status || 0,
    category: props.values.category || "",
    description: props.values.description ||"",
  });


  const [form] = Form.useForm();

  const [file, setFile] = React.useState<UploadFile[]>([]);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const renderContent = () => {

    return (
      <>
        <FormItem name="name" label="name">
          <Input style={{ width: '100%' }} />
        </FormItem>
        <FormItem name="price" label="price">
          <Input style={{ width: '100%' }} />
        </FormItem>
        <FormItem name="stock" label="stock">
          <Input style={{ width: '100%' }} />
        </FormItem>
        <FormItem name="status" label="status">
          <Input style={{ width: '100%' }} />
        </FormItem>
        <FormItem name="category" label="category">
          <Input style={{ width: '100%' }} />
        </FormItem>
      </>
    );

  }

  const renderFooter = () => {
    const { onCancel: handleUpdateModalVisible, values, onSubmit } = props;

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>

        <Button type="primary" onClick={() => {
          if (file.length > 0) {
            onSubmit({ ...values, ...form.getFieldsValue(), ...file[0].response.data})
          } else {
            onSubmit({ ...values, ...form.getFieldsValue()})
          }
         
        }
        
        
      
      }
        >
          修改
          </Button>
      </>
    );


  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
         ...formVals
        }}
      >
        {renderContent()}
      </Form>

      <ImgFile value={file} onChange={setFile}/>
    </Modal>
  );
};

export default UpdateForm;
