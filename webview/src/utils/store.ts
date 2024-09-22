import { Reducer, ReducerAction } from "react";

type DataState = {
  headers: string[];
  data: Record<string, string>[];
};

type Action =
  | {
      type: "init";
      payload: DataState;
    }
  | {
      type: "update";
      payload: DataState;
    };

export const initialState = {
  headers: [],
  data: [],
};

export const dataReducer: Reducer<DataState, Action> = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...action.payload };
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
