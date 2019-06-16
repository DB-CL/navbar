import { Menu, MenuData } from './menu';
import { Environment } from './environment';
import { Row } from './row';

declare var DEV: boolean;

(function() {
    try {

        const style = document.createElement('style');
        let styleTxt = 'html { font-family: helvetica neue,Arial,sans-serif;}';
        // include the balloon css library
        // tslint:disable-next-line: max-line-length
        styleTxt += 'button[data-balloon]{overflow:visible}[data-balloon]{position:relative;cursor:pointer}[data-balloon]:after{filter:alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";-moz-opacity:0;-khtml-opacity:0;opacity:0;pointer-events:none;-webkit-transition:all 0.18s ease-out 0.18s;-moz-transition:all 0.18s ease-out 0.18s;-ms-transition:all 0.18s ease-out 0.18s;-o-transition:all 0.18s ease-out 0.18s;transition:all 0.18s ease-out 0.18s;font-family:sans-serif !important;font-weight:normal !important;font-style:normal !important;text-shadow:none !important;font-size:12px !important;background:rgba(17,17,17,0.9);border-radius:4px;color:#fff;content:attr(data-balloon);padding:.5em 1em;position:absolute;white-space:nowrap;z-index:10}[data-balloon]:before{background:no-repeat url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17,17,17,0.9)%22%20transform%3D%22rotate(0)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E");background-size:100% auto;width:18px;height:6px;filter:alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";-moz-opacity:0;-khtml-opacity:0;opacity:0;pointer-events:none;-webkit-transition:all 0.18s ease-out 0.18s;-moz-transition:all 0.18s ease-out 0.18s;-ms-transition:all 0.18s ease-out 0.18s;-o-transition:all 0.18s ease-out 0.18s;transition:all 0.18s ease-out 0.18s;content:\'\';position:absolute;z-index:10}[data-balloon]:hover:before,[data-balloon]:hover:after,[data-balloon][data-balloon-visible]:before,[data-balloon][data-balloon-visible]:after{filter:alpha(opacity=100);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";-moz-opacity:1;-khtml-opacity:1;opacity:1;pointer-events:auto}[data-balloon].font-awesome:after{font-family:FontAwesome}[data-balloon][data-balloon-break]:after{white-space:pre}[data-balloon][data-balloon-blunt]:before,[data-balloon][data-balloon-blunt]:after{-webkit-transition:none;-moz-transition:none;-ms-transition:none;-o-transition:none;transition:none}[data-balloon][data-balloon-pos="up"]:after{bottom:100%;left:50%;margin-bottom:11px;-webkit-transform:translate(-50%, 10px);-moz-transform:translate(-50%, 10px);-ms-transform:translate(-50%, 10px);transform:translate(-50%, 10px);-webkit-transform-origin:top;-moz-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon][data-balloon-pos="up"]:before{bottom:100%;left:50%;margin-bottom:5px;-webkit-transform:translate(-50%, 10px);-moz-transform:translate(-50%, 10px);-ms-transform:translate(-50%, 10px);transform:translate(-50%, 10px);-webkit-transform-origin:top;-moz-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon][data-balloon-pos="up"]:hover:after,[data-balloon][data-balloon-pos="up"][data-balloon-visible]:after{-webkit-transform:translate(-50%, 0);-moz-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}[data-balloon][data-balloon-pos="up"]:hover:before,[data-balloon][data-balloon-pos="up"][data-balloon-visible]:before{-webkit-transform:translate(-50%, 0);-moz-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}[data-balloon][data-balloon-pos="up-left"]:after{bottom:100%;left:0;margin-bottom:11px;-webkit-transform:translate(0, 10px);-moz-transform:translate(0, 10px);-ms-transform:translate(0, 10px);transform:translate(0, 10px);-webkit-transform-origin:top;-moz-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon][data-balloon-pos="up-left"]:before{bottom:100%;left:5px;margin-bottom:5px;-webkit-transform:translate(0, 10px);-moz-transform:translate(0, 10px);-ms-transform:translate(0, 10px);transform:translate(0, 10px);-webkit-transform-origin:top;-moz-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon][data-balloon-pos="up-left"]:hover:after,[data-balloon][data-balloon-pos="up-left"][data-balloon-visible]:after{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos="up-left"]:hover:before,[data-balloon][data-balloon-pos="up-left"][data-balloon-visible]:before{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos="up-right"]:after{bottom:100%;right:0;margin-bottom:11px;-webkit-transform:translate(0, 10px);-moz-transform:translate(0, 10px);-ms-transform:translate(0, 10px);transform:translate(0, 10px);-webkit-transform-origin:top;-moz-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon][data-balloon-pos="up-right"]:before{bottom:100%;right:5px;margin-bottom:5px;-webkit-transform:translate(0, 10px);-moz-transform:translate(0, 10px);-ms-transform:translate(0, 10px);transform:translate(0, 10px);-webkit-transform-origin:top;-moz-transform-origin:top;-ms-transform-origin:top;transform-origin:top}[data-balloon][data-balloon-pos="up-right"]:hover:after,[data-balloon][data-balloon-pos="up-right"][data-balloon-visible]:after{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos="up-right"]:hover:before,[data-balloon][data-balloon-pos="up-right"][data-balloon-visible]:before{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos=\'down\']:after{left:50%;margin-top:11px;top:100%;-webkit-transform:translate(-50%, -10px);-moz-transform:translate(-50%, -10px);-ms-transform:translate(-50%, -10px);transform:translate(-50%, -10px)}[data-balloon][data-balloon-pos=\'down\']:before{background:no-repeat url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17,17,17,0.9)%22%20transform%3D%22rotate(180 18 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E");background-size:100% auto;width:18px;height:6px;left:50%;margin-top:5px;top:100%;-webkit-transform:translate(-50%, -10px);-moz-transform:translate(-50%, -10px);-ms-transform:translate(-50%, -10px);transform:translate(-50%, -10px)}[data-balloon][data-balloon-pos=\'down\']:hover:after,[data-balloon][data-balloon-pos=\'down\'][data-balloon-visible]:after{-webkit-transform:translate(-50%, 0);-moz-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}[data-balloon][data-balloon-pos=\'down\']:hover:before,[data-balloon][data-balloon-pos=\'down\'][data-balloon-visible]:before{-webkit-transform:translate(-50%, 0);-moz-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}[data-balloon][data-balloon-pos=\'down-left\']:after{left:0;margin-top:11px;top:100%;-webkit-transform:translate(0, -10px);-moz-transform:translate(0, -10px);-ms-transform:translate(0, -10px);transform:translate(0, -10px)}[data-balloon][data-balloon-pos=\'down-left\']:before{background:no-repeat url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17,17,17,0.9)%22%20transform%3D%22rotate(180 18 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E");background-size:100% auto;width:18px;height:6px;left:5px;margin-top:5px;top:100%;-webkit-transform:translate(0, -10px);-moz-transform:translate(0, -10px);-ms-transform:translate(0, -10px);transform:translate(0, -10px)}[data-balloon][data-balloon-pos=\'down-left\']:hover:after,[data-balloon][data-balloon-pos=\'down-left\'][data-balloon-visible]:after{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos=\'down-left\']:hover:before,[data-balloon][data-balloon-pos=\'down-left\'][data-balloon-visible]:before{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos=\'down-right\']:after{right:0;margin-top:11px;top:100%;-webkit-transform:translate(0, -10px);-moz-transform:translate(0, -10px);-ms-transform:translate(0, -10px);transform:translate(0, -10px)}[data-balloon][data-balloon-pos=\'down-right\']:before{background:no-repeat url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17,17,17,0.9)%22%20transform%3D%22rotate(180 18 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E");background-size:100% auto;width:18px;height:6px;right:5px;margin-top:5px;top:100%;-webkit-transform:translate(0, -10px);-moz-transform:translate(0, -10px);-ms-transform:translate(0, -10px);transform:translate(0, -10px)}[data-balloon][data-balloon-pos=\'down-right\']:hover:after,[data-balloon][data-balloon-pos=\'down-right\'][data-balloon-visible]:after{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos=\'down-right\']:hover:before,[data-balloon][data-balloon-pos=\'down-right\'][data-balloon-visible]:before{-webkit-transform:translate(0, 0);-moz-transform:translate(0, 0);-ms-transform:translate(0, 0);transform:translate(0, 0)}[data-balloon][data-balloon-pos=\'left\']:after{margin-right:11px;right:100%;top:50%;-webkit-transform:translate(10px, -50%);-moz-transform:translate(10px, -50%);-ms-transform:translate(10px, -50%);transform:translate(10px, -50%)}[data-balloon][data-balloon-pos=\'left\']:before{background:no-repeat url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba(17,17,17,0.9)%22%20transform%3D%22rotate(-90 18 18)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E");background-size:100% auto;width:6px;height:18px;margin-right:5px;right:100%;top:50%;-webkit-transform:translate(10px, -50%);-moz-transform:translate(10px, -50%);-ms-transform:translate(10px, -50%);transform:translate(10px, -50%)}[data-balloon][data-balloon-pos=\'left\']:hover:after,[data-balloon][data-balloon-pos=\'left\'][data-balloon-visible]:after{-webkit-transform:translate(0, -50%);-moz-transform:translate(0, -50%);-ms-transform:translate(0, -50%);transform:translate(0, -50%)}[data-balloon][data-balloon-pos=\'left\']:hover:before,[data-balloon][data-balloon-pos=\'left\'][data-balloon-visible]:before{-webkit-transform:translate(0, -50%);-moz-transform:translate(0, -50%);-ms-transform:translate(0, -50%);transform:translate(0, -50%)}[data-balloon][data-balloon-pos=\'right\']:after{left:100%;margin-left:11px;top:50%;-webkit-transform:translate(-10px, -50%);-moz-transform:translate(-10px, -50%);-ms-transform:translate(-10px, -50%);transform:translate(-10px, -50%)}[data-balloon][data-balloon-pos=\'right\']:before{background:no-repeat url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba(17,17,17,0.9)%22%20transform%3D%22rotate(90 6 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E");background-size:100% auto;width:6px;height:18px;left:100%;margin-left:5px;top:50%;-webkit-transform:translate(-10px, -50%);-moz-transform:translate(-10px, -50%);-ms-transform:translate(-10px, -50%);transform:translate(-10px, -50%)}[data-balloon][data-balloon-pos=\'right\']:hover:after,[data-balloon][data-balloon-pos=\'right\'][data-balloon-visible]:after{-webkit-transform:translate(0, -50%);-moz-transform:translate(0, -50%);-ms-transform:translate(0, -50%);transform:translate(0, -50%)}[data-balloon][data-balloon-pos=\'right\']:hover:before,[data-balloon][data-balloon-pos=\'right\'][data-balloon-visible]:before{-webkit-transform:translate(0, -50%);-moz-transform:translate(0, -50%);-ms-transform:translate(0, -50%);transform:translate(0, -50%)}[data-balloon][data-balloon-length=\'small\']:after{white-space:normal;width:80px}[data-balloon][data-balloon-length=\'medium\']:after{white-space:normal;width:150px}[data-balloon][data-balloon-length=\'large\']:after{white-space:normal;width:260px}[data-balloon][data-balloon-length=\'xlarge\']:after{white-space:normal;width:380px}@media screen and (max-width: 768px){[data-balloon][data-balloon-length=\'xlarge\']:after{white-space:normal;width:90vw}}[data-balloon][data-balloon-length=\'fit\']:after{white-space:normal;width:100%}\ ';

        style.appendChild(document.createTextNode(styleTxt));

        document.head.appendChild(style);


        const xmlhttp = new XMLHttpRequest();
        // Ask the user for the dataUrl value (url to get the JSON configuration)
        let configurationUrl: string;
        if (typeof DEV !== 'undefined' && DEV === true) {
            Environment.getInstance().devMode = true;
            configurationUrl = 'http://localhost:3000/navbar.json';
        } else {
            configurationUrl = GM_getValue('dataUrl');

            if (!configurationUrl) {
                const tempUrl = prompt('Set the URL to the JSON file');
                if (tempUrl && Row.validURL(tempUrl)) {
                    configurationUrl = tempUrl;
                    GM_setValue('dataUrl', configurationUrl);
                } else {
                    throw new Error('Invalid URL ' + tempUrl);
                }
            }
        }

        // download the configuration
        let configuration: MenuData;
        if (Environment.getInstance().devMode === true) {
            xmlhttp.open('GET',  configurationUrl, true);
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        configuration = JSON.parse(xmlhttp.responseText);
                        const M = new Menu(configuration);
                        M.init();
                    } else {
                        throw new Error('Cannot retrieve configuration file (status !=200)');
                    }
                }
            };
            xmlhttp.send(null);
        } else {
            GM_xmlhttpRequest({
                method: 'GET',
                url: configurationUrl,
                headers: { 'Access-Control-Allow-Credentials': 'true' },
                onload: function(response) {
                    if (response.status === 200) {
                        configuration = JSON.parse(response.responseText);
                        const M = new Menu(configuration);
                        M.init();
                    }
                }
            });
        }

    } catch (err) {
        console.error(err);
    }
})();
