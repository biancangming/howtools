import { saveFileFromBlob } from "./blob";

/**
 * html 导出 word（.doc 格式）
 * 兼容导出图片。
 * @param htmlContent html的string值  例如 <h>导出文件</h>
 * @param fileName 导出文件名称不带后缀
 */
export function html2word(htmlContent: string, fileName = `${new Date().getTime()}`) {
    const fileBody = {
        top: "Mime-Version: 1.0\nContent-Base: " + '' + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + '' + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
        head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"></head>\n",
        body: "<body>_body_</body>"
    };
    /**
     * 对于base64图片需要进行处理 直接引入的地址不需要处理
     */
    const imagesBase64 = [];
    let imgList = htmlContent.split('img')
        .filter(o => o.indexOf('src') >= 0 && o.indexOf('base64'))
        .map(o => {
            let temp = o.substring(o.indexOf('src') + 5);
            return temp.substring(0, temp.indexOf('"'));
        });
    for (let i = 0; i < imgList.length; i++) {
        const uri = imgList[i];
        imagesBase64[i] = {
            type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
            encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
            location: uri,
            data: uri.substring(uri.indexOf(",") + 1)
        };
    }
    let fileBottom = "\n";
    if (imgList && imgList.length) {
        for (let i = 0; i < imagesBase64.length; i++) {
            fileBottom += "--NEXT.ITEM-BOUNDARY\n";
            fileBottom += "Content-Location: " + imagesBase64[i].location + "\n";
            fileBottom += "Content-Type: " + imagesBase64[i].type + "\n";
            fileBottom += "Content-Transfer-Encoding: " + imagesBase64[i].encoding + "\n\n";
            fileBottom += imagesBase64[i].data + "\n\n";
        }
    }
    fileBottom += "--NEXT.ITEM-BOUNDARY--";
    const fileContent = fileBody.top.replace("_html_", fileBody.head + fileBody.body.replace("_body_", htmlContent)) + fileBottom;
    saveFileFromBlob(fileContent, fileName + ".doc", "application/msword;charset=utf-8")
}


/**
 * 原生table 标签转为 excel
 * html table 转为 excel
 * 对于 日期 长数字 等导出excel展示格式有问题的，需要将单元导出成文本的情况，需要在对应的td进行处理
 * 示例 <td :x:str="num">{{num}}</td>
 *
 *
 * @param tableContent 原生<table>的string值  例如 <table><td>导出excel</td></table>
 * @param fileName 文件名称不含后缀
 * @param sheetName 工作表名称
 */
export function table2excel(tableContent: string, fileName = `${new Date().getTime()}`, sheetName = 'Sheet1') {
    //替换table数据和worksheet名字
    const format = function (s: string, c: Record<string, any>) {
        return s.replace(/{(\w+)}/g,
            function (m, p) {
                return c[p];
            });
    }
    const template = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>' +
        '<meta http-equiv=Content-Type content="text/html; charset=utf-8">' +
        '<meta name=Generator content="Microsoft Excel"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
        + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
        + '</x:ExcelWorkbook></xml><![endif]-->' +
        ' <style type="text/css">' +
        'table td {' +
        'border: 1px solid #000000;' +
        'width: 200px;' +
        'height: 30px;' +
        ' }' +
        '</style>' +
        '</head><body >{table}</body></html>';
    const ctx = { worksheet: sheetName, table: tableContent };
    saveFileFromBlob(format(template, ctx), `${fileName}.xls`)
}


/**
 * @param  {accept:string} accept 文件类型限制
 * @param  {boolean}} multiple 是否选择多个文件, 默认单个文件
 * @description 上传本地文件
 */
interface LoadFileOption { accept: string, multiple: boolean }
export function loadLocalFile(opt?: Partial<LoadFileOption>): Promise<FileList> {
    if (!opt) {
        opt = { accept: "*", multiple: false }
    } else {
        opt = { accept: opt.accept || "*", multiple: opt.multiple || false }
    }

    const { accept, multiple } = opt
    return new Promise((resolve) => {
        const iput = document.createElement("input")
        iput.style.zIndex = '-100'
        iput.setAttribute('type', 'file')
        iput.setAttribute('accept', accept)
        multiple && iput.setAttribute('multiple', 'multiple')
        iput.click()
        const changeFile = () => {
            resolve(iput.files)
            iput.remove()
        }
        iput.onchange = changeFile
    })
}