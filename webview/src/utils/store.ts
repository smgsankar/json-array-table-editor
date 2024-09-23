import { Reducer } from "react";
import { findDiffIndex } from "./helpers";

export type Data = Record<string, string>[];
export type DiffIndex = {
  index: number;
  header: string;
};

export type DataState = {
  headers: string[];
  data: Data;
  forceUpdate?: DiffIndex;
};

type Action =
  | {
      type: "init";
      payload: DataState;
    }
  | {
      type: "revert";
      payload: DataState;
    };

export const initialState = {
  headers: [],
  data: [],
  forceUpdate: undefined,
};

export const dataReducer: Reducer<DataState, Action> = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload, forceUpdate: undefined };
    case "revert":
      const diffIndex = findDiffIndex(state.data, action.payload.data);
      return { ...state, ...action.payload, forceUpdate: diffIndex };
    default:
      return state;
  }
};
