"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataReducer = exports.initialState = void 0;
exports.initialState = {
    headers: [],
    data: [],
};
const dataReducer = (state, action) => {
    switch (action.type) {
        case "init":
            return { ...action.payload };
        case "update":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
exports.dataReducer = dataReducer;
//# sourceMappingURL=store.js.map