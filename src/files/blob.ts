import { isJSON, isServer } from "../utils/util"
import { contentTypeStr } from './contentType';

export function saveFileFromBlob(file: any, fileName: string, contentType: contentTypeStr | string = "application/*") {
    if (isServer) {
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


/**
 * @param b Blob格式文件
 * @description blob转化为json，常用于后端文件报错时处理
*/
export function blob2Json(b: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            const content = reader.result as string;//内容就在这里
            if (isJSON(content)) {
                resolve(JSON.parse(content))
            } else {
                reject(b)
            }
        };
        reader.readAsText(b);
    })
}
