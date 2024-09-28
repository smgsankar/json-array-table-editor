// @ts-ignore
const vscode = acquireVsCodeApi();

export const postMessageToVSCode = (message: any) => {
  vscode.postMessage(message);
};

export const updateCellContent = (
  rowIndex: number,
  header: string,
  value: string
) => {
  postMessageToVSCode({ type: "update", rowIndex, header, value });
};

export const addRow = () => {
  postMessageToVSCode({ type: "addRow" });
};

export const addColumn = (columnName: string, defaultValue: string) => {
  postMessageToVSCode({ type: "addColumn", columnName, defaultValue });
};

export const deleteRow = (rowIndex: number) => {
  postMessageToVSCode({ type: "deleteRow", rowIndex });
};
