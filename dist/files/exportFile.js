"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFileFromBlob = void 0;
function saveFileFromBlob(file, fileName, contentType) {
    if (contentType === void 0) { contentType = "application/*"; }
    if (!document) {
        throw new Error("this methods is running in browser");
    }
    var link = document.createElement("a");
    var blob = new Blob([file], {
        type: contentType,
    });
    var url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}
exports.saveFileFromBlob = saveFileFromBlob;
