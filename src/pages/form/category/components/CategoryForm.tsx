import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker } from 'antd';
import { Store, ValidateErrorEntity, InternalNamePath } from 'rc-field-form/es/interface';

import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CategoryTable from './CategoryTable';
import FooterToolbar from './FooterToolbar'
// import FooterToolbar from './components/FooterToolbar';
import {connect} from 'dva';
import styles from '../style.less';

interface CategoryTableDateType {
    key: string;
    categoryName?: string;
    type?: string;
}

interface CategoryFormProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
  tableData :CategoryTableDateType[];
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const fieldLabels = {
    name: '仓库名',
    url: '仓库域名',
    owner: '仓库管理员',
    approver: '审批人',
    dateRange: '生效日期',
    type: '仓库类型',
    name2: '任务名',
    url2: '任务描述',
    owner2: '执行人',
    approver2: '责任人',
    dateRange2: '生效日期',
    type2: '任务类型',
  };

const CategoryForm: FC<CategoryFormProps> = ({tableData, submitting, dispatch }) => {

  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter(item => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map(err => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: Store) => {
    setError([]);
    dispatch({
      type: 'formCategory/getCategories',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    // console.log('Failed:', errorInfo);
    setError(errorInfo.errorFields);
  };

  return (

      
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ category: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
        
    <PageHeaderWrapper content="种类管理">
      
      <Card title="种类管理" bordered={false}>
          <Form.Item name="category">
            <CategoryTable />
          </Form.Item>
        </Card>

        </PageHeaderWrapper>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>

    </Form>
  );
};

export default CategoryForm;