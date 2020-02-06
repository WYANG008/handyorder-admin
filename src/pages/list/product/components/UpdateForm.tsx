import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { TableListItem } from '../data';

export interface FormValueType extends Partial<TableListItem> {
  productId: string;
  productName: string;
  productPrice: number;
  productStock: number;
  productStatus: number;
  categoryType: number;
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
    productId: props.values.productName || "",
    productName: props.values.productName || "",
    productPrice: props.values.productPrice || 0,
    productStock: props.values.productStock || 0,
    productStatus: props.values.productStatus || 0,
    categoryType: props.values.categoryType || 0,

  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  console.log("########## updateForm values: ", values)


  const renderContent = () => {
  
      return (
        <>
          <FormItem name="productName" label="productName">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem name="productPrice" label="productPrice">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem name="productStock" label="productStock">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem name="productStatus" label="productStatus">
            <Input style={{ width: '100%' }}/>
          </FormItem>
          <FormItem name="categoryType" label="categoryType">
            <Input style={{ width: '100%' }}/>
          </FormItem>
        </>
      );
    
  }

  const renderFooter = () => {
    const { onCancel: handleUpdateModalVisible, values, onSubmit } = props;

      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => onSubmit(formVals)}>
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
      {/* <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="配置规则属性" />
        <Step title="设定调度周期" />
      </Steps> */}
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          productName: formVals.productName || "",
          productPrice: formVals.productPrice || 0,
          productStock: formVals.productStock || 0,
          productStatus: formVals.productStatus || 0,
          categoryType: formVals.categoryType || 0,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;