"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DataCell_1 = require("./DataCell");
const IndexCell_1 = require("./IndexCell");
function BareDataRow({ rowIndex, headers, rowData }) {
    return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)(IndexCell_1.IndexCell, { index: rowIndex }), headers.map((header) => ((0, jsx_runtime_1.jsx)(DataCell_1.DataCell, { datum: rowData[header], rowIndex: rowIndex, header: header }, `${header}_${rowIndex}`)))] }, rowIndex));
}
exports.DataRow = (0, react_1.memo)(BareDataRow, (prev, next) => {
    return (prev.rowIndex === next.rowIndex &&
        prev.headers === next.headers &&
        JSON.stringify(prev.rowData) === JSON.stringify(next.rowData));
});
//# sourceMappingURL=DataRow.js.map