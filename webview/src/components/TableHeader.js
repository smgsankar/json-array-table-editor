"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHeader = TableHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const HeaderCell_1 = require("./HeaderCell");
const HeaderIndexCell_1 = require("./HeaderIndexCell");
function TableHeader({ headers }) {
    return ((0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)(HeaderIndexCell_1.HeaderIndexCell, {}), headers.map((header) => ((0, jsx_runtime_1.jsx)(HeaderCell_1.HeaderCell, { header: header }, header)))] }) }));
}
//# sourceMappingURL=TableHeader.js.map