import * as vscode from "vscode";

export class JsonArrayTableEditor implements vscode.CustomTextEditorProvider {
  public static readonly viewType = "jsonArrayTableEditor.jsonArrayTableEditor";

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new JsonArrayTableEditor(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      JsonArrayTableEditor.viewType,
      provider
    );
    return providerRegistration;
  }

  constructor(private readonly context: vscode.ExtensionContext) {}

  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    webviewPanel.webview.onDidReceiveMessage(
      this.handleMessage,
      undefined,
      this.context.subscriptions
    );

    function updateWebview() {
      webviewPanel.webview.postMessage({
        type: "init",
        text: document.getText(),
      });
    }

    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        updateWebview();
      }
    });

    updateWebview();
  }

  private handleMessage(message: any) {
    if (message.type === "error") {
      vscode.window
        .showErrorMessage(message.text, "Reload", "Dismiss")
        .then((action) => {
          if (action === "Reload") {
            vscode.commands.executeCommand("workbench.action.reloadWindow");
          }
        });
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    // for production
    // const scriptSrc = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this.context.extensionUri, "webview", "dist", "main.js")
    // );

    // for development
    const scriptSrc = "http://localhost:3000/main.js";

    return /* html */ `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
			</head>
			<body>
				<div id="root"></div>
				<script src="${scriptSrc}"></script>
			</body>
			</html>`;
  }
}
