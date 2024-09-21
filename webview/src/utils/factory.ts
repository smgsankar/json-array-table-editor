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
