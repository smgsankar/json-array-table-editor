"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const factory_1 = require("../utils/factory");
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
function BareDataCell({ datum, header, rowIndex }) {
    const ref = (0, react_1.useRef)(null);
    const updateContentToDocument = (value) => {
        (0, factory_1.updateCellContent)(rowIndex, header, value);
    };
    const throttledUpdate = (0, react_1.useRef)((0, lodash_throttle_1.default)(updateContentToDocument, 1000)).current;
    const onChange = (event) => {
        const { value } = event.target;
        throttledUpdate(value);
    };
    (0, react_1.useEffect)(() => {
        if (!ref.current || document.activeElement === ref.current)
            return;
        ref.current.value = datum;
    }, [datum]);
    return ((0, jsx_runtime_1.jsx)("td", { className: "cell", children: (0, jsx_runtime_1.jsx)("textarea", { ref: ref, onChange: onChange }) }));
}
exports.DataCell = (0, react_1.memo)(BareDataCell);
//# sourceMappingURL=DataCell.js.map