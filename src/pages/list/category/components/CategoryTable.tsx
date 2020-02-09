import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message, Modal, Form } from 'antd';
import React from 'react';
import { Dispatch } from 'redux';
import styles from '../style.less';
import { TableFormDateType } from '../data';


interface TableFormProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  value: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

interface AddedCategory {
  key: number | null;
  categoryName: string;
  type: string;
}

interface TableFormState {
  clickedCancel: boolean;
  modalVisable: boolean;
  index: number;
  addedCategory: AddedCategory;
}


export default class CategoryTable extends React.Component<TableFormProps, TableFormState> {
  // console.log("value xxxxxxxxx : ",value)

  constructor(props: TableFormProps) {
    super(props);
    this.state = {
      clickedCancel: false,
      modalVisable: false,
      index: 0,
      addedCategory: {
        key: null,
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
            type: this.state.addedCategory.type,
            key: this.state.addedCategory.key
          }
        });
        break;
      case "type":
        this.setState({
          addedCategory: {
            categoryName: this.state.addedCategory.categoryName,
            key: this.state.addedCategory.key,
            type: value
          }
        });
        break;
      default:
        break;
    }
  };



  private updateRecord = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();

    const target = this.props.value?.filter(item => item.key === key)[0];
    if (target) {
      console.log("key", key)
      console.log("target, ", target)
      this.setState({
        addedCategory: {
          key: target.key ? Number(target.key) : null,
          categoryName: target.categoryName || "",
          type: target.type || ""
        }
      })
      this.setState({

        modalVisable: true
      })
      console.log("nw state", this.state)
    }
  };


  handleOk = () => {
    if (this.state.addedCategory.categoryName && this.state.addedCategory.type) {
      const payload = {
        categoryName: this.state.addedCategory.categoryName,
        categoryType: this.state.addedCategory.type,
        categoryId: this.state.addedCategory.key
      };

      this.props.dispatch({
        type: 'formCategory/addCategory',
        payload: payload
      });
      this.setState({
        addedCategory: {
          categoryName: "",
          type: "",
          key: null
        }
      });
      setTimeout(() => {
        this.props.dispatch({
          type: 'formCategory/getCategories'
        });

      }, 500);
    }
    this.setState({
      modalVisable: false,
    });
  };

  private handleRemoveCategory = (e: React.MouseEvent<HTMLElement>, key: string) => {
    e.preventDefault();

    if (key) {
      this.props.dispatch({
        type: 'formCategory/removeCategory',
        payload: {
          key: Number(key)
        }
      });

      setTimeout(() => {
        this.props.dispatch({
          type: 'formCategory/getCategories'
        });

      }, 500);

    }

  };

  // private handleFieldChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: string,
  //   key: string,
  // ) => {
  //   // const newData = [...(this.state.data as TableFormDateType[])];
  //   const target = this.props.value?.filter(item => item.key === key)[0];
  //   if (target) {
  //     target[fieldName] = e.target.value;
  //     // setData(newData);
  //     this.setState({
  //       data: newData
  //     })
  //   }
  // };


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
        return text;
      },
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      render: (text: string, record: TableFormDateType) => {
        return text;
      },
    },

    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && this.props.loading) {
          return null;
        }

        return (
          <span>
            <a onClick={e => this.updateRecord(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={(e) => {
              console.log(">>>>>>>>>>> wow >>>>>>>>>")
              this.handleRemoveCategory(e, record.key)
            }}>
              <a >删除</a>
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
          loading={this.props.loading}
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
                onChange={e => this.handleChange("type", e.target.value)} />
            </Form.Item>

          </Form>
        </Modal>
      </>
    );

  }


};

