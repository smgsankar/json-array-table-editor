"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRow = exports.addRow = exports.updateCellContent = exports.postMessageToVSCode = void 0;
// @ts-ignore
const vscode = acquireVsCodeApi();
const postMessageToVSCode = (message) => {
    vscode.postMessage(message);
};
exports.postMessageToVSCode = postMessageToVSCode;
const updateCellContent = (rowIndex, header, value) => {
    (0, exports.postMessageToVSCode)({ type: "update", rowIndex, header, value });
};
exports.updateCellContent = updateCellContent;
const addRow = () => {
    (0, exports.postMessageToVSCode)({ type: "add" });
};
exports.addRow = addRow;
const deleteRow = (rowIndex) => {
    (0, exports.postMessageToVSCode)({ type: "delete", rowIndex });
};
exports.deleteRow = deleteRow;
//# sourceMappingURL=factory.js.map