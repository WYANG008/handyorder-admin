import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Subscription } from 'dva';
import { message } from 'antd';
import { getCategories, addOrUpdateCategories, deleteCategoryServicePost } from './service';
import { ServerCategoryList,TableFormDateType } from './data';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

interface StateType {
  tableData: TableFormDateType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getCategories: Effect;
    addCategory: Effect;
    removeCategory: Effect;
  };

  reducers: {
    categoryList: Reducer<StateType>;
    addOrUpdateCategories: Reducer<StateType>;
    removeCategory: Reducer<StateType>;
  };
  // subscriptions: { setup: Subscription };
}

// const initState = {
//   tableData: [],
// };

const Model: ModelType = {
  namespace: 'formCategory',

  state:{
    tableData: [],
  },

  effects: {
    *getCategories({ payload }, { call, put }) {
      const response = yield call(getCategories, payload);
      console.log("get categories, response data : ", response.data)
      yield put({
        type: 'categoryList',
        payload: {
          tableData: response.data
        },
      });
      //   console.log("cat list response: ", response)
      //   message.success('get成功');
    },
    *addCategory({ payload }, { call, put }) {
      console.log("start call addcategory with payload : ", payload)
      const response = yield call(addOrUpdateCategories, payload);
      yield put({
        type: 'addOrUpdateCategories',
        payload: response.data,
      });
        // console.log("cat list response: ", response)
        // message.success('get成功');
    },
    *removeCategory({ payload }, { call, put }) {
      // console.log("start call dispatch addCategory")
      console.log(">>>>>>>>>>>> removeCategory with payload: ", payload)
      if (payload){
        const response = yield call(deleteCategoryServicePost, payload);
        console.log("response data : ", response)
        if (response.code == 0) {
          yield put({
            type: 'removeCategory',
            payload:  response.data,
          });

          message.success('删除成功');
        }

      }
  
      // }

        // console.log("cat list response: ", response)
        
    },
  },

  reducers: {
    categoryList(state, { payload }) {
      
      state = {...state, ...payload}
      console.log(">>>>>>>>>>> state after category list", state)
      return {
        ...state,
        ...payload,
      };
    },
    addOrUpdateCategories(state, { payload }) {
      console.log("state after category list")
      console.log({
        ...state,
        tableData: [...state?.tableData,...payload],
        loading : false
      });
      return {
        ...state,
        tableData: [...state?.tableData,...payload]
      }
    },
    removeCategory(state, { payload }) {

      if (state && state.tableData.length > 0){
        state.tableData = state.tableData.filter(e => e.key != payload.categoryId )

        // 
        
      }
      // const newState = state;
      console.log(" >>>>>>>>>>>>>> state after remove", Object.assign({}, state))
      return Object.assign({}, state);


     
    },

  },
  // subscriptions: {
  //   setup({dispatch, history }): void {
  //     // Subscribe history(url) change, trigger `load` action if pathname is `/`
  //     history.listen(({ pathname, search }): void => {
  //       console.log("listern: ", pathname, search);
  //       // dispatch({
  //       //   type: 'getCategories',
  //       // });
  //     });
  //   },
  // },
};

export default Model;
