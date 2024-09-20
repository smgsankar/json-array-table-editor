import * as vscode from "vscode";
import { JsonArrayTableEditor } from "./JsonArrayTableEditor";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(JsonArrayTableEditor.register(context));
}

export function deactivate() {}
