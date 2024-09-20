// @ts-ignore
const vscode = acquireVsCodeApi();

console.log("vscode ==> ", vscode);

export const postMessageToVSCode = (message: any) => {
  vscode.postMessage(message);
};
