import { isUndefined } from './type';
/**
 * @param  {string} src cdn 用于动态加载js cdn，而无需全局声明
 * @description 例如加载高德地图
 * scriptLoader(
      "https://webapi.amap.com/maps?v=1.4.15&key=ce54012687b5c2a4e14c86b37606a61"
    ).then(() => {
      const map = new (window as any).AMap.Map("map", {
        center: [108.952214, 34.276423],
        zoom: 11,
        features: ["bg", "road", "building", "point"],
        mapStyle: "amap://styles/dark",
      });
    });
 */
export function scriptLoader(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/**
 * @param  {'full'|'exit'} mode
 * @description 全屏或全屏退出
 */
function Screen(mode: 'full' | 'exit') {
  const el: any = document.documentElement;
  const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  const cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;

  //IE浏览器
  const ActiveXObject = (window as any).ActiveXObject

  const action = mode === 'full' ? rfs : cfs
  if (action) {
    action.call(el);
  }
  else if (!isUndefined(ActiveXObject)) {
    const wscript = new ActiveXObject("WScript.Shell");
    if (wscript != null) {
      wscript.SendKeys("{F11}");
    }
  }
}

export const fullScreen = () => Screen('full')
export const exitScreen = () => Screen('exit')