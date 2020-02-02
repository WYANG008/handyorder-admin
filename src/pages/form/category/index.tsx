import React, { Component } from 'react';
import CategoryForm from './components/CategoryForm';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { ServerCategoryList } from './data.d';

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

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'formCategory/clear',
  //   });
  //   cancelAnimationFrame(this.reqRef);
  //   clearTimeout(this.timeoutId);
  // }


  // const[error, setError] = useState<ErrorField[]> ([]);


  render() {
    const { formCategory, dispatch,submitting, loading } = this.props;
    console.log("############## loading : ", loading);
    console.log(formCategory.tableData);

    return (
      <CategoryForm tableData={formCategory.tableData.map(e => {

        return {
          key: e.categoryId,
          categoryName:e.categoryName,
          type: e.categoryType
        }
      })} dispatch={dispatch} submitting = {submitting}/>

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
    // submitting: loading.effects['formCategory/getCategories'],
  }),
)(Category);