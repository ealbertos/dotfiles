Object.defineProperty(exports, "__esModule", {
    value: !0
});

const vscode = require("vscode"), path_1 = require("path"), utils = require("./utils"), constants_1 = require("./constants"), inflection = require("inflection");

exports.RailsHelper = class RailsHelper {
    constructor(relativeFileName, line) {
        this.patterns = [ path_1.join(constants_1.REL_CONTROLLERS, "PTN", "*"), path_1.join(constants_1.REL_CONTROLLERS, "PTN*"), path_1.join(constants_1.REL_MODELS, "SINGULARIZE", "*"), path_1.join(constants_1.REL_MODELS, "SINGULARIZE*"), path_1.join(constants_1.REL_MODELS, "BASENAME_SINGULARIZE", "*"), path_1.join(constants_1.REL_MODELS, "BASENAME_SINGULARIZE*"), path_1.join(constants_1.REL_VIEWS, "PTN", "*"), path_1.join(constants_1.REL_VIEWS, "PTN*"), path_1.join(constants_1.REL_LAYOUTS, "PTN", "*"), path_1.join(constants_1.REL_LAYOUTS, "PTN*"), path_1.join(constants_1.REL_HELPERS, "PTN", "*"), path_1.join(constants_1.REL_HELPERS, "PTN*"), path_1.join(constants_1.REL_JAVASCRIPTS, "PTN", "*"), path_1.join(constants_1.REL_JAVASCRIPTS, "PTN*"), path_1.join(constants_1.REL_STYLESHEETS, "PTN", "*"), path_1.join(constants_1.REL_STYLESHEETS, "PTN*") ], 
        this.relativeFileName = relativeFileName, this.fileName = path_1.basename(relativeFileName);
        const filePath = path_1.dirname(relativeFileName);
        this.line = line, this.initPatten(filePath);
    }
    searchPaths() {
        const res = [];
        return this.patterns.forEach(e => {
            let p = e.replace("PTN", this.filePatten.toString());
            p = p.replace("BASENAME_SINGULARIZE", inflection.singularize(path_1.basename(this.filePatten.toString()))), 
            p = p.replace("SINGULARIZE", inflection.singularize(this.filePatten.toString())), 
            res.push(p);
        }), res;
    }
    initPatten(filePath) {
        this.filePatten = null, this.targetFile = null;
        const fileType = utils.dectFileType(filePath), prefix = filePath.substring(constants_1.FileTypeRelPath.get(fileType).length + 1);
        switch (fileType) {
          case constants_1.FileType.Controller:
            this.filePatten = path_1.join(prefix, this.fileName.replace(/_controller\.rb$/, "")), 
            this.line && /^def\s+/.test(this.line) && (this.filePatten = path_1.join(this.filePatten, this.line.replace(/^def\s+/, "")));
            break;

          case constants_1.FileType.Model:
            path_1.join(prefix, this.fileName.replace(/\.rb$/, ""));
            this.filePatten = inflection.pluralize(this.filePatten.toString());
            break;

          case constants_1.FileType.Layout:
            this.filePatten = path_1.join(prefix, this.fileName.replace(/\..*?\..*?$/, ""));
            break;

          case constants_1.FileType.View:
            this.filePatten = prefix;
            break;

          case constants_1.FileType.Helper:
            this.filePatten = "" === prefix && "application_helper.rb" === this.fileName ? "" : path_1.join(prefix, this.fileName.replace(/_helper\.rb$/, ""));
            break;

          case constants_1.FileType.Javascript:
            this.filePatten = path_1.join(prefix, this.fileName.replace(/\.js$/, "").replace(/\..*?\..*?$/, ""));
            break;

          case constants_1.FileType.StyleSheet:
            this.filePatten = path_1.join(prefix, this.fileName.replace(/\.css$/, "").replace(/\..*?\..*?$/, ""));
            break;

          case constants_1.FileType.Rspec:
            this.targetFile = path_1.join("app", prefix, this.fileName.replace("_spec.rb", ".rb"));
            break;

          case constants_1.FileType.Test:
            this.filePatten = path_1.join("app", prefix, this.fileName.replace("_test.rb", ".rb"));
        }
    }
    generateList(arr) {
        const ap = arr.map(async cur => (await vscode.workspace.findFiles(cur.toString(), null)).map(i => vscode.workspace.asRelativePath(i)).filter(v => this.relativeFileName !== v));
        return Promise.all(ap).then(lists => utils.flatten(lists));
    }
    showQuickPick(items) {
        vscode.window.showQuickPick(items, {
            placeHolder: "Select File",
            matchOnDetail: !0
        }).then(value => {
            if (!value) return;
            const fn = vscode.Uri.parse("file://" + path_1.join(vscode.workspace.rootPath, value));
            vscode.workspace.openTextDocument(fn).then(doc => vscode.window.showTextDocument(doc));
        });
    }
    showFileList() {
        if (null != this.filePatten) {
            const paths = this.searchPaths().slice();
            this.generateList(paths).then(v => {
                this.showQuickPick(v);
            });
        } else null != this.targetFile && this.generateList([ this.targetFile ]).then(v => {
            this.showQuickPick(v);
        });
    }
};