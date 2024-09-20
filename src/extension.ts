// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "jsonArrayTableEditor" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "jsonArrayTableEditor.helloWorld",
    (args) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from json-array-table-editor!"
      );

      vscode.window.showInformationMessage(args);

      let panel = vscode.window.createWebviewPanel(
        "webview",
        "React",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      // web is for my react root directory, rename for yours

      const scriptSrc = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "web", "dist", "index.js")
      );

      panel.webview.html = `<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
					</head>
					<body>
						<noscript>You need to enable JavaScript to run this app.</noscript>
						<div id="root"></div>
						<script src="${scriptSrc}"></script>
					</body>
				</html>
				`;
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
