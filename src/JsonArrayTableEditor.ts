import * as vscode from "vscode";

export class JsonArrayTableEditor implements vscode.CustomTextEditorProvider {
  public static readonly viewType = "jsonArrayTableEditor.jsonArrayTableEditor";
  private parsedJSON: Record<string, string>[];

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new JsonArrayTableEditor(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      JsonArrayTableEditor.viewType,
      provider
    );
    return providerRegistration;
  }

  constructor(private readonly context: vscode.ExtensionContext) {
    this.parsedJSON = [];
  }

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
      (message) => this.handleMessage(document, message),
      undefined,
      this.context.subscriptions
    );

    const updateWebview = (reason?: vscode.TextDocumentChangeReason) => {
      const json = document.getText();
      const parsed = JSON.parse(json);
      this.parsedJSON = JSON.parse(document.getText());
      if (!reason) {
        webviewPanel.webview.postMessage({
          type: "init",
          text: parsed,
        });
      }
      webviewPanel.webview.postMessage({
        type: "revert",
        text: parsed,
      });
    };

    const changeSub = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        updateWebview(e.reason);
      }
    });

    const saveSub = vscode.workspace.onDidSaveTextDocument((e) => {
      if (e.uri.toString() === document.uri.toString()) {
        updateWebview();
      }
    });

    webviewPanel.onDidChangeViewState((e) => {
      if (e.webviewPanel.visible) {
        updateWebview();
      }
    });

    webviewPanel.onDidDispose(() => {
      changeSub.dispose();
      saveSub.dispose();
    });

    updateWebview();
  }

  private handleMessage(document: vscode.TextDocument, message: any) {
    switch (message.type) {
      case "error":
        vscode.window
          .showErrorMessage(message.text, "Reload", "Dismiss")
          .then((action) => {
            if (action === "Reload") {
              vscode.commands.executeCommand("workbench.action.reloadWindow");
            }
          });
        break;
      case "update":
        const edit = new vscode.WorkspaceEdit();
        const { rowIndex, header, value } = message;
        this.parsedJSON = [
          ...this.parsedJSON.slice(0, rowIndex),
          {
            ...this.parsedJSON[rowIndex],
            [header]: value,
          },
          ...this.parsedJSON.slice(rowIndex + 1),
        ];
        const json = JSON.stringify(this.parsedJSON, null, 2);
        edit.replace(
          document.uri,
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          ),
          json
        );
        vscode.workspace.applyEdit(edit);
        break;
      case "addRow":
        const addEdit = new vscode.WorkspaceEdit();
        const emptyRow = Object.fromEntries(
          Object.keys(this.parsedJSON[0]).map((key) => [key, ""])
        );
        this.parsedJSON = [...this.parsedJSON, emptyRow];
        const addJson = JSON.stringify(this.parsedJSON, null, 2);
        addEdit.replace(
          document.uri,
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          ),
          addJson
        );
        vscode.workspace.applyEdit(addEdit);
        break;
      case "deleteRow":
        const deleteEdit = new vscode.WorkspaceEdit();
        const { rowIndex: deleteIndex } = message;
        this.parsedJSON = [
          ...this.parsedJSON.slice(0, deleteIndex),
          ...this.parsedJSON.slice(deleteIndex + 1),
        ];
        const deleteJson = JSON.stringify(this.parsedJSON, null, 2);
        deleteEdit.replace(
          document.uri,
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          ),
          deleteJson
        );
        vscode.workspace.applyEdit(deleteEdit);
        break;
      case "addColumn":
        const addColumnEdit = new vscode.WorkspaceEdit();
        const { columnName, defaultValue } = message;
        this.parsedJSON = this.parsedJSON.map((row) => ({
          ...row,
          [columnName]: defaultValue ?? "",
        }));
        const addColumnJson = JSON.stringify(this.parsedJSON, null, 2);
        addColumnEdit.replace(
          document.uri,
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          ),
          addColumnJson
        );
        vscode.workspace.applyEdit(addColumnEdit);
        break;
      case "deleteColumn":
        const deleteColumnEdit = new vscode.WorkspaceEdit();
        const { columnName: deleteColumnName } = message;
        this.parsedJSON = this.parsedJSON.map((row) => {
          const { [deleteColumnName]: _, ...rest } = row;
          return rest;
        });
        const deleteColumnJson = JSON.stringify(this.parsedJSON, null, 2);
        deleteColumnEdit.replace(
          document.uri,
          new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          ),
          deleteColumnJson
        );
        vscode.workspace.applyEdit(deleteColumnEdit);
        break;
      default:
        console.log("Unknown message type: ", message);
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    // for production
    const scriptSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "scripts", "main.js")
    );

    // for development
    // const scriptSrc = "http://localhost:3000/main.js";

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
