import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Subscription } from 'dva';
import { message } from 'antd';
import { getCategories, addOrUpdateCategories, removeCategory, deleteCategory } from './service';
import { ServerCategoryList,TableFormDateType } from './data';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {
    tableData: TableFormDateType[];
  };
  effects: {
    getCategories: Effect;
    addCategory: Effect;
    removeCategory: Effect;
  };

  reducers: {
    categoryList: Reducer<ServerCategoryList>;
    addOrUpdateCategories: Reducer<ServerCategoryList>;
  };
  // subscriptions: { setup: Subscription };
}

const initState = {
  tableData: [],
};

const Model: ModelType = {
  namespace: 'formCategory',

  state: initState,

  effects: {
    *getCategories({ payload }, { call, put }) {
      const response = yield call(getCategories, payload);
      console.log("response data : ", response.data)
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
      console.log("removeCategory : ", payload)
      const response = yield call(removeCategory, payload);
      console.log("response data : ", response)
      // if (response.code == 0) {
        yield put({
          type: 'removeCategory',
          payload: response.data,
        });
      // }

        // console.log("cat list response: ", response)
        // message.success('get成功');
    },
  },

  reducers: {
    categoryList(state, { payload }) {

      return {
        ...state,
        ...payload,
      };
    },
    addOrUpdateCategories(state, { payload }) {
      return {
        ...state,
        tableData: [...state?.tableData,...payload]
      }

      // let newState = state;
      // if (newState && newState.tableData.length > 0){
      //   let duplicated = false;
       
      //   newState.tableData = newState.tableData.map(e => {
      //     if (e.categoryId == payload.categoryId){
      //       duplicated = true;
      //       return payload
      //     } else {
      //       return e
      //     }
      //   } )

      //   if (!duplicated){
      //     newState.tableData = newState.tableData.concat(payload)
      //   }

        

      // } else {
      //   newState = {
      //     tableData: [payload]
      //   }
       
      // }

      // return {
      //   ...state,
      //   ...newState,
      // }
    },
    removeCategory(state, { payload }) {
      console.log("current state", state);
      console.log("payload :", payload);
      // let newState = state;
      if (state && state.tableData.length > 0){
        state.tableData = state.tableData.filter(e => e.categoryId != payload.key )
      }
      return {
        ...state
      }
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
