// @ts-ignore
const vscode = acquireVsCodeApi();

export const postMessageToVSCode = (message: any) => {
  vscode.postMessage(message);
};
