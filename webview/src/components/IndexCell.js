"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexCell = IndexCell;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const factory_1 = require("../utils/factory");
function IndexCell({ index }) {
    const ref = (0, react_1.useRef)(null);
    const onClick = () => {
        ref.current?.focus();
    };
    const onKeyDown = (e) => {
        e.preventDefault();
        if (e.key === "Delete") {
            (0, factory_1.deleteRow)(index);
        }
    };
    return ((0, jsx_runtime_1.jsx)("td", { tabIndex: 0, onClick: onClick, onKeyDown: onKeyDown, className: "cell index-cell resize resize-y", children: index + 1 }));
}
//# sourceMappingURL=IndexCell.js.map