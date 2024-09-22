"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableEditor = TableEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const factory_1 = require("../utils/factory");
const DataRow_1 = require("./DataRow");
const TableHeader_1 = require("./TableHeader");
require("./table.css");
function TableEditor({ data, headers }) {
    return ((0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("table", { children: [(0, jsx_runtime_1.jsx)(TableHeader_1.TableHeader, { headers: headers }), (0, jsx_runtime_1.jsx)("tbody", { children: data.map((row, index) => ((0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { rowData: row, rowIndex: index, headers: headers }, index))) })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: factory_1.addRow, children: "Add Row" })] }));
}
//# sourceMappingURL=TableEditor.js.map