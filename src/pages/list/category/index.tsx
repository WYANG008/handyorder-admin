import React, { Component } from 'react';
import CategoryTable from './components/CategoryTable';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import {Card} from 'antd';
import { ServerCategoryList } from './data';

interface CategoryFormProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  submitting: boolean;
  formCategory: ServerCategoryList;
}

interface CategoryState {

}

class Category extends Component<CategoryFormProps, CategoryState>  {

  state: CategoryState = {};
  reqRef: number = 0;

  timeoutId: number = 0;
  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'formCategory/getCategories',
      });
    });
    console.log("reqFreq: ", this.reqRef)
  }

  render() {
    const { formCategory,loading, dispatch } = this.props;

    return (
      <Card title="种类管理" bordered={false}>
        <CategoryTable loading={loading} dispatch={dispatch} value={formCategory.tableData.map(e => {
          return {
            key: e.categoryId,
            categoryName:e.categoryName,
            type: e.categoryType
          }
        })}/>
      </Card>

    );
  }

}

export default connect(
  ({
    formCategory,
    loading,
  }: {
    formCategory: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    formCategory,
    loading: loading.effects['formCategory/getCategories'],
    // submitting: loading.effects['formCategory/addCategory'],
  }),
)(Category);