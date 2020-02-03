import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message, Modal, Form } from 'antd';
import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import styles from '../style.less';
import { FormInstance } from 'antd/es/form';
// import { FormInstance } from 'antd/lib/form';

interface TableFormDateType {
  key: string;
  categoryName?: string;
  type?: string;
  isNew?: boolean;
  editable?: boolean;
}
interface TableFormProps {
  // form: FormInstance;
  dispatch: Dispatch<any>;
  value: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

interface AddedCategory {
  categoryName: string;
  type: string;
}

interface TableFormState {
  clickedCancel: boolean;
  loading: boolean;
  modalVisable: boolean;
  index: number;
  data: TableFormDateType[];
  cacheOriginData: any;
  addedCategory: AddedCategory;
}


export default class CategoryTable extends React.Component<TableFormProps, TableFormState> {
  // console.log("value xxxxxxxxx : ",value)

  constructor(props: TableFormProps) {
		super(props);
		this.state = {
      clickedCancel: false,
      modalVisable: false,
			loading: false,
      index: 0,
      data: this.props.value,
      cacheOriginData: {},
      addedCategory: {
        categoryName: "",
        type: ""
      }
    };
  }
  
  private showModal = () => {
    this.setState({
      modalVisable: true,
    });
  };

  private handleKeyPress = (key: string) => {
		if (key === 'Enter' && this.state.addedCategory.categoryName && this.state.addedCategory.type)
			this.handleOk();
  };
  
  
	private handleChange = (label: string, value: string = '') => {
		switch (label) {
			case "categoryName":
				this.setState({
					addedCategory: {
            categoryName: value,
            type: this.state.addedCategory.type
          }
				});
				break;
			case "type":
        this.setState({
					addedCategory: {
            categoryName: this.state.addedCategory.categoryName,
            type: value
          }
				});
				break;
			default:
				break;
		}
	};

  private getRowByKey = (key: string, newData?: TableFormDateType[]) => {
    return (newData || this.state.data)?.filter(item => item.key === key)[0];
  };

  private toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = this.state.data?.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {

        this.state.cacheOriginData[key] = { ...target };
        // this.state.cacheOriginData
        // this.setState({
        //   cacheOriginData: cacheOriginData
        // });
      }
      target.editable = !target.editable;
      // setData(newData);
      this.setState({
        data: newData
      })
    }
  };


  private remove = (key: string) => {
    const newData = this.state.data?.filter(item => item.key !== key) as TableFormDateType[];
    // setData(newData);
    this.setState({
      data: newData
    })
    if (this.props.onChange) {
      this.props.onChange(newData);
    }
  };

  private handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(this.state.data as TableFormDateType[])];
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      // setData(newData);
      this.setState({
        data: newData
      })
    }
  };

  private saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {

    console.log("key ", key);
    // console.log("target ",target)
    e.persist();
    // setLoading(true);
    this.setState({
      loading: true
    })
    setTimeout(() => {
      if (this.state.clickedCancel) {
        // setClickedCancel(false);
        this.setState({
          clickedCancel: false
        })
        return;
      }
      const target = this.getRowByKey(key) || ({} as any);
      console.log("target ",target)
      if (!target.categoryName || !target.type) {
        message.error('请填写完整成员信息。');
        (e.target as HTMLInputElement).focus();
        this.setState({
          loading: false
        })
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      if (this.props.onChange) {
        this.props.onChange(this.state.data as TableFormDateType[]);
      }
      this.setState({
        loading: false
      })
    }, 500);
  };


  private cancel = (e: React.MouseEvent, key: string) => {
    // setClickedCancel(true);
    this.setState({
      clickedCancel: true
    })
    e.preventDefault();
    const newData = [...(this.state.data as TableFormDateType[])];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newData.map(item => {
      if (item.key === key) {
        if (this.state.cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...this.state.cacheOriginData[key],
            editable: false,
          };
          delete this.state.cacheOriginData[key];
          // setCacheOriginData(cacheOriginData);
          this.setState({
            cacheOriginData: this.state.cacheOriginData
          })
          return originItem;
        }
      }
      return item;
    });
    // setData(cacheData);
    this.setState({
      data: cacheData,
      clickedCancel: false
    })
    // setClickedCancel(false);
  };

  handleOk = () => {
    console.log("handleOk")
    if(this.state.addedCategory.categoryName && this.state.addedCategory.type){
      const payload = {
        categoryName: this.state.addedCategory.categoryName,
        categoryType: this.state.addedCategory.type
      };
      console.log("dispatch addCategory with payload ",payload)
      this.props.dispatch({
        type: 'formCategory/addCategory',
        payload:{
          categoryName: this.state.addedCategory.categoryName,
          categoryType: this.state.addedCategory.type
        }
      });
    }
    this.setState({
      modalVisable: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      modalVisable: false,
    });
  };


  private columns = [
    {
      title: 'categoryName',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: '30%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => this.handleFieldChange(e, 'categoryName', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="categoryName"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={e => this.handleFieldChange(e, 'type', record.key)}
              onKeyPress={e => this.handleKeyPress(e, record.key)}
              placeholder="type"
            />
          );
        }
        return text;
      },
    },

    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && this.state.loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={e => this.cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];



  public render() {
    // const {dispatch} = this.props;
    const { categoryName, type } = this.state.addedCategory;

    // const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <>
        <Table<TableFormDateType>
          loading={this.state.loading}
          columns={this.columns}
          dataSource={this.props.value}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
      
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.showModal}
        >
          <PlusOutlined />
          新增种类
        </Button>

        <Modal
          title="Add Category"
          visible={this.state.modalVisable}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="categoryName">
             <Input 
              value={categoryName} 
              onKeyPress={e => this.handleKeyPress(e.key)}
							onChange={e => this.handleChange("categoryName", e.target.value)}
            />
          </Form.Item>
          
          <Form.Item label="type">
             <Input value={type}
              onKeyPress={e => this.handleKeyPress(e.key)}
							onChange={e => this.handleChange("type", e.target.value)}/>
          </Form.Item>
       
      </Form>
        </Modal>
      </>
    );

  }


};

