export function saveFileFromBlob(file: any, fileName: string, contentType = "application/*") {
    if (!document) {
        throw new Error("this methods is running in browser")
    }
    const link = document.createElement("a");
    const blob = new Blob([file], {
        type: contentType,//这个是Content-Typele的type类型（https://tool.oschina.net/commons）
    });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.click();
    link.remove()
    window.URL.revokeObjectURL(url);
}