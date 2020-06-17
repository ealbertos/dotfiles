Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), path = require("path"), axios_1 = require("axios"), rails_1 = require("./symbols/rails"), ruby_1 = require("./symbols/ruby"), url = require("url");

const source = axios_1.default.CancelToken.source();

function showSide(symbol, html, context) {
    vscode.window.activeTextEditor && vscode.window.activeTextEditor.viewColumn;
    vscode.window.createWebviewPanel("Document", "Document " + symbol, vscode.ViewColumn.Two, {
        enableScripts: !0,
        retainContextWhenHidden: !0
    }).webview.html = html;
}

function doRequest(_url, symbol) {
    axios_1.default({
        url: url.parse(_url),
        timeout: 5e3,
        cancelToken: source.token
    }).then(r => {
        if ("string" == typeof r.data) {
            const html = function injectBase(html, base) {
                const _base = path.dirname(base) + "/";
                let _html = html.replace(/(<[^>/]*head[^>]*>)[\s\S]*?(<[^>/]*base[^>]*>)[\s\S]*?(<[^>]*head[^>]*>)/gim, "$1 $3");
                return _html = _html.replace(/<head>/gim, `<head><base href="${_base}">\n<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src vscode-resource: http:; script-src vscode-resource: http: 'unsafe-inline' ; style-src vscode-resource: http: 'unsafe-inline';">\n<style> body{margin:20px;}</style>`), 
                _html;
            }(r.data, _url);
            showSide(symbol, html);
        } else {
            showSide(symbol, "No valid response content.");
        }
    }).catch(err => {
        showSide(symbol, err.toString());
    });
}

exports.viewDoc = function viewDoc() {
    const context = this, document = vscode.window.activeTextEditor.document, position = vscode.window.activeTextEditor.selection.active, wordRange = document.getWordRangeAtPosition(position), word = document.getText(wordRange), lineStartToWord = document.getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end)).trim(), symbol = new RegExp("(((::)?[A-Za-z]+)*(::)?" + word + ")").exec(lineStartToWord)[1];
    let endpoint = "";
    const isRailsSymbol = rails_1.RAILS.has(symbol.toLowerCase()), isRubySymbol = ruby_1.RUBY.has(symbol.toLowerCase());
    if (symbol && (isRailsSymbol || isRubySymbol) && (endpoint = symbol.replace("::", "/")), 
    null === endpoint) return;
    let url = "";
    if (isRubySymbol) url = `http://docs.rubydocs.org/ruby-${ruby_1.VERSION.replace(/\./g, "-")}/classes/${endpoint}.html`; else {
        if (!isRailsSymbol) return void showSide(symbol, "No matched symbol on extension side.");
        url = `http://api.rubyonrails.org/classes/${endpoint}.html`;
    }
    doRequest.call(context, url, symbol);
};