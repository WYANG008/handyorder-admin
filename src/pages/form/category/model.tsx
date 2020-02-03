import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap, Subscription } from 'dva';
import { message } from 'antd';
import { getCategories, addOrUpdateCategories } from './service';
import { ServerCategoryList } from './data.d';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    getCategories: Effect;
    addCategory: Effect;
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
      // console.log("start call dispatch addCategory")
      console.log("addcategory : ", payload)
      const response = yield call(addOrUpdateCategories, payload);
      console.log("response data : ", response)
      yield put({
        type: 'addOrUpdateCategories',
        payload: {
          tableData: [response.data]
        },
      });
        console.log("cat list response: ", response)
        // message.success('get成功');
    },
  },

  reducers: {
    categoryList(state, { payload }) {
      // console.log("object", obj )
      return {
        ...state,
        ...payload,
      };
    },
    addOrUpdateCategories(state, { payload }) {
      // console.log("object", obj )
      return {
        ...state,
        ...payload,
      };
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
