import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
import { queryProduct, updateProduct, addProduct, removeProduct } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addProduct({
      productName: fields.productName,
      productPrice: fields.productPrice,
      productStock: fields.productStock,
      productDescription: fields.productDescription,
      productIcon: fields.productIcon,
      productStatus: fields.productStatus,
      categoryType: fields.categoryType
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  console.log("########## update fields, ", fields)
  const hide = message.loading('正在配置');
  // console.log("after hide", )
  try {
    await updateProduct({
      productId: fields.productId,
      productName: fields.productName,
      productPrice: fields.productPrice,
      productStock: fields.productStock,
      productDescription: fields.productDescription,
      productIcon: fields.productIcon,
      productStatus: fields.productStatus,
      categoryType: fields.categoryType
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  console.log(">>>>>>>>>>>", selectedRows);
  if (!selectedRows) return true;
  try {
    await removeProduct({
      productId: selectedRows.map(row => row.productId),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '产品名称',
      dataIndex: 'productName',
    },
    {
      title: '价格',
      dataIndex: 'productPrice',
      sorter: true,
    },
    {
      title: '存量',
      dataIndex: 'productStock',

      renderText: (val: string) => `${val} 个`,
    },
    {
      title: '状态',
      dataIndex: 'productStatus',
      valueEnum: {
        0: { text: '已下架', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        // 2: { text: '已上线', status: 'Success' },
        // 3: { text: '异常', status: 'Error' },
      },
    },

    {
      title: '种类',
      dataIndex: 'categoryType',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={async e => {
              const success = await handleRemove([record] as any);
              if (success) {
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }
            }
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="产品列表"
        actionRef={actionRef}
        rowKey="productId"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}

        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              {/* 服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万 */}
            </span>
          </div>
        )}
        request={params => queryProduct(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {formValues && Object.keys(formValues).length ? (
        <UpdateForm
          onSubmit={async value => {

            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={formValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
