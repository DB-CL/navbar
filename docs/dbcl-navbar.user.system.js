System.register("environment", [], function (exports_1, context_1) {
    "use strict";
    var Environment;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Environment = class Environment {
                constructor() {
                    this._devMode = false;
                }
                get devMode() { return this._devMode; }
                set devMode(dev) {
                    this._devMode = dev;
                }
                get url() {
                    if (this.devMode === true) {
                        return '.';
                    }
                    else {
                        return 'https://db-cl.github.io/navbar';
                    }
                }
                static getInstance() {
                    if (Environment._instance === undefined) {
                        Environment._instance = new Environment();
                    }
                    return Environment._instance;
                }
            };
            exports_1("Environment", Environment);
        }
    };
});
System.register("foldArrow", ["environment"], function (exports_2, context_2) {
    "use strict";
    var environment_1, FoldArrow;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (environment_1_1) {
                environment_1 = environment_1_1;
            }
        ],
        execute: function () {
            /**
             * Fold arrow (minified menu)
             */
            FoldArrow = class FoldArrow {
                get html() {
                    return this._html;
                }
                constructor() {
                    this._html = document.createElement('div');
                    this.build();
                }
                build() {
                    this._html.style.position = 'fixed';
                    this._html.style.top = '-3px';
                    this._html.style.left = '10px';
                    this._html.style.height = '20px';
                    this._html.style.width = '25px';
                    this._html.style.backgroundColor = '#333333';
                    this._html.style.display = 'flex';
                    this._html.style.justifyContent = 'center';
                    this._html.style.alignItems = 'center';
                    this._html.style.borderRadius = '3px';
                    const arrowIcon = document.createElement('img');
                    arrowIcon.src = environment_1.Environment.getInstance().url + '/assets/fa-arrow-down.png';
                    arrowIcon.style.height = '10px';
                    arrowIcon.style.width = '10px';
                    arrowIcon.style.marginTop = '3px';
                    arrowIcon.style.cursor = 'pointer';
                    this._html.appendChild(arrowIcon);
                }
                hide() {
                    this._html.style.display = 'none';
                }
                show() {
                    this._html.style.display = 'flex';
                }
            };
            exports_2("FoldArrow", FoldArrow);
        }
    };
});
System.register("row", ["environment"], function (exports_3, context_3) {
    "use strict";
    var environment_2, Row;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (environment_2_1) {
                environment_2 = environment_2_1;
            }
        ],
        execute: function () {
            Row = class Row {
                constructor(data, iconSize) {
                    this._selected = false;
                    this._data = data;
                    this._row = document.createElement('div');
                    this._icon = document.createElement('button');
                    this._iconSize = iconSize;
                    this.build();
                }
                get icon() { return this._data.icon; }
                get url() { return this._data.url; }
                get name() { return this._data.name; }
                get html() { return this._row; }
                /**
                 * @thanks https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
                 */
                static validURL(str) {
                    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                    return !!pattern.test(str);
                }
                build() {
                    this._row.style.width = '100%px';
                    this._row.style.height = '40px';
                    this._row.style.display = 'flex';
                    this._row.style.flexDirection = 'row';
                    this._row.style.alignItems = 'center';
                    this._row.style.color = '#ececec';
                    this._row.style.cursor = 'pointer';
                    this._row.onmouseenter = () => {
                        this._row.style.backgroundColor = '#444444';
                        this._row.style.color = '#fafafa';
                    };
                    this._row.onmouseleave = () => {
                        this._row.style.backgroundColor = 'transparent';
                        this._row.style.color = '#ececec';
                    };
                    this._row.onclick = () => {
                        const win = window.open(this.url, '_blank');
                        if (win) {
                            win.focus();
                        }
                    };
                    if (this.isSelected()) {
                        this._row.style.borderLeft = '3px solid #4286f4';
                    }
                    else {
                        this._row.style.borderLeft = '3px solid transparent';
                    }
                    const url = (Row.validURL(this.icon)) ? this.icon : environment_2.Environment.getInstance().url + '/assets/apps/' + this.icon + '.png';
                    this._icon.style.backgroundImage = 'url(' + url + ')';
                    this._icon.style.border = '0';
                    this._icon.style.backgroundColor = 'transparent';
                    this._icon.style.backgroundRepeat = 'no-repeat';
                    this._icon.style.backgroundSize = 'contain';
                    this._icon.style.height = this._iconSize + 'px';
                    this._icon.style.minHeight = this._iconSize + 'px';
                    this._icon.style.width = this._iconSize + 'px';
                    this._icon.style.minWidth = this._iconSize + 'px';
                    this._icon.style.margin = '0px 10px 0px 7px'; // 7 because it's 10px - 3px border (selected)
                    this._icon.style.cursor = 'pointer';
                    this._row.appendChild(this._icon);
                    const title = document.createElement('div');
                    title.innerHTML = this.name;
                    title.style.textTransform = 'capitalize';
                    title.style.lineHeight = '21px';
                    title.style.fontSize = '14px';
                    title.style.fontWeight = '700';
                    title.style.paddingLeft = '5px';
                    title.setAttribute('class', 'expanded-only');
                    this._row.appendChild(title);
                }
                /**
                 * Very basic way to guess if this link is selected
                 */
                isSelected() {
                    const currentUrl = window.location.href;
                    if (currentUrl.includes(this._data.url)) {
                        return true;
                    }
                    return false;
                }
                enableTooltip() {
                    this._icon.setAttribute('data-balloon', this.name);
                    this._icon.setAttribute('data-balloon-pos', 'right');
                }
                disableTooltip() {
                    this._icon.removeAttribute('data-balloon');
                    this._icon.removeAttribute('data-balloon-pos');
                }
            };
            exports_3("Row", Row);
        }
    };
});
System.register("store", ["environment"], function (exports_4, context_4) {
    "use strict";
    var environment_3, Store;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (environment_3_1) {
                environment_3 = environment_3_1;
            }
        ],
        execute: function () {
            /**
             * Object used to manage values stored in GM_setvalue store
             * It also allow double behaviour with dev mode (GM functions not available)
             */
            Store = class Store {
                constructor() {
                    this._expanded = true;
                    this._folded = true;
                }
                static getInstance() {
                    if (Store._instance === undefined) {
                        Store._instance = new Store();
                    }
                    return Store._instance;
                }
                getExpanded() {
                    if (environment_3.Environment.getInstance().devMode !== true) {
                        const expanded = GM_getValue('expanded');
                        if (expanded !== undefined && expanded !== null) {
                            this._expanded = !!GM_getValue('expanded');
                        }
                    }
                    return this._expanded;
                }
                getFolded() {
                    if (environment_3.Environment.getInstance().devMode !== true) {
                        const folded = GM_getValue('folded');
                        if (folded !== undefined && folded !== null) {
                            this._folded = !!GM_getValue('folded');
                        }
                    }
                    return this._folded;
                }
                toggleExpanded() {
                    this._expanded = !this._expanded;
                    if (environment_3.Environment.getInstance().devMode !== true) {
                        GM_setValue('expanded', this._expanded);
                    }
                    return this._expanded;
                }
                toggleFolded() {
                    this._folded = !this._folded;
                    if (environment_3.Environment.getInstance().devMode !== true) {
                        GM_setValue('folded', this._folded);
                    }
                    return this._folded;
                }
            };
            exports_4("Store", Store);
        }
    };
});
System.register("menu", ["row", "environment", "foldArrow", "store"], function (exports_5, context_5) {
    "use strict";
    var row_1, environment_4, foldArrow_1, store_1, Menu;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (row_1_1) {
                row_1 = row_1_1;
            },
            function (environment_4_1) {
                environment_4 = environment_4_1;
            },
            function (foldArrow_1_1) {
                foldArrow_1 = foldArrow_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }
        ],
        execute: function () {
            /**
             * Main menu
             */
            Menu = class Menu {
                constructor(data) {
                    this._apps = new Array();
                    this._data = data;
                    this._expanded = store_1.Store.getInstance().getExpanded();
                    this._folded = store_1.Store.getInstance().getFolded();
                    this._foldArrow = new foldArrow_1.FoldArrow();
                    this._html = document.createElement('div');
                    this.build();
                }
                /**
                 * Accessors from the JSON configuration file
                 */
                get width() { return this._data.width; }
                get apps() { return this._data.apps; }
                get iconSize() { return this._data.iconSize; }
                get title() { return this._data.title; }
                /**
                 * Build the HTML of the menu
                 */
                build() {
                    this._html.setAttribute('id', 'dbcl-navbar-menu');
                    this._html.style.width = this.width + 'px';
                    this._html.style.height = '100%';
                    this._html.style.position = 'fixed';
                    this._html.style.top = '0px';
                    this._html.style.left = '0px';
                    this._html.style.display = 'flex';
                    this._html.style.flexDirection = 'column';
                    this._html.style.backgroundColor = '#333333';
                    const body = document.querySelector('body');
                    if (body) {
                        body.appendChild(this._html);
                        body.appendChild(this._foldArrow.html);
                        this._foldArrow.html.onclick = this.toggleFolded.bind(this);
                        this.buildHeader();
                        this.buildRows();
                    }
                }
                /**
                 * Init the state of the menu
                 * @TODO instead of two booleans, make it one property with three values
                 */
                init() {
                    if (this._expanded) {
                        this.expand();
                    }
                    else {
                        this.reduce();
                    }
                    if (!this._folded) {
                        this.show();
                        this._foldArrow.hide();
                    }
                    else {
                        this.hide();
                        this._foldArrow.show();
                    }
                }
                hide() {
                    this._html.style.display = 'none';
                }
                show() {
                    this._html.style.display = 'flex';
                }
                toggleFolded() {
                    if (this._folded) {
                        this.show();
                        this._foldArrow.hide();
                    }
                    else {
                        this.hide();
                        this._foldArrow.show();
                    }
                    this._folded = store_1.Store.getInstance().toggleFolded();
                }
                reduce() {
                    this._html.style.width = (20 + this.iconSize) + 'px';
                    document.querySelectorAll('.expanded-only').forEach((element) => {
                        element.style.display = 'none';
                    });
                    this._apps.forEach(row => {
                        row.enableTooltip();
                    });
                }
                expand() {
                    this._html.style.width = '220px';
                    document.querySelectorAll('.expanded-only').forEach((element) => {
                        element.style.display = 'block';
                    });
                    this._apps.forEach(row => {
                        row.disableTooltip();
                    });
                }
                toggleExpanded() {
                    if (this._expanded) {
                        this.reduce();
                    }
                    else {
                        this.expand();
                    }
                    this._expanded = store_1.Store.getInstance().toggleExpanded();
                }
                buildHeader() {
                    const menu = this._html;
                    const header = document.createElement('div');
                    header.style.width = '100%';
                    header.style.height = '40px';
                    header.style.backgroundColor = '#3a4248';
                    header.style.display = 'flex';
                    header.style.flexDirection = 'row';
                    header.style.alignItems = 'center';
                    const icon = document.createElement('img');
                    icon.src = environment_4.Environment.getInstance().url + '/assets/fa-menu.png';
                    icon.style.height = '20px';
                    icon.style.width = '20px';
                    icon.style.margin = '10px ' + (this.iconSize / 2) + 'px';
                    icon.style.cursor = 'pointer';
                    icon.onclick = this.toggleExpanded.bind(this);
                    header.appendChild(icon);
                    const title = document.createElement('div');
                    title.innerHTML = this.title;
                    title.style.color = '#fafafa';
                    title.style.textTransform = 'uppercase';
                    title.style.lineHeight = '21px';
                    title.style.fontSize = '16px';
                    title.style.paddingLeft = '5px';
                    title.style.flex = '1';
                    title.setAttribute('class', 'expanded-only');
                    header.appendChild(title);
                    const foldIcon = document.createElement('img');
                    foldIcon.src = environment_4.Environment.getInstance().url + '/assets/fa-arrow-up.png';
                    foldIcon.style.height = '10px';
                    foldIcon.style.width = '10px';
                    foldIcon.style.margin = '10px';
                    foldIcon.style.cursor = 'pointer';
                    foldIcon.onclick = this.toggleFolded.bind(this);
                    foldIcon.setAttribute('class', 'expanded-only');
                    header.appendChild(foldIcon);
                    menu.appendChild(header);
                }
                buildRows() {
                    this.apps.forEach((app) => {
                        const row = new row_1.Row(app, this.iconSize);
                        this._html.appendChild(row.html);
                        this._apps.push(row);
                    });
                }
            };
            exports_5("Menu", Menu);
        }
    };
});
System.register("index", ["menu", "environment", "row"], function (exports_6, context_6) {
    "use strict";
    var menu_1, environment_5, row_2;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (menu_1_1) {
                menu_1 = menu_1_1;
            },
            function (environment_5_1) {
                environment_5 = environment_5_1;
            },
            function (row_2_1) {
                row_2 = row_2_1;
            }
        ],
        execute: function () {
            (function () {
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
                    let configurationUrl;
                    if (typeof DEV !== 'undefined' && DEV === true) {
                        environment_5.Environment.getInstance().devMode = true;
                        configurationUrl = 'http://localhost:3000/navbar.json';
                    }
                    else {
                        configurationUrl = GM_getValue('dataUrl');
                        if (!configurationUrl) {
                            const tempUrl = prompt('Set the URL to the JSON file');
                            if (tempUrl && row_2.Row.validURL(tempUrl)) {
                                configurationUrl = tempUrl;
                                GM_setValue('dataUrl', configurationUrl);
                            }
                            else {
                                throw new Error('Invalid URL ' + tempUrl);
                            }
                        }
                    }
                    // download the configuration
                    let configuration;
                    if (environment_5.Environment.getInstance().devMode === true) {
                        xmlhttp.open('GET', configurationUrl, true);
                        xmlhttp.onreadystatechange = () => {
                            if (xmlhttp.readyState === 4) {
                                if (xmlhttp.status === 200) {
                                    configuration = JSON.parse(xmlhttp.responseText);
                                    const M = new menu_1.Menu(configuration);
                                    M.init();
                                }
                                else {
                                    throw new Error('Cannot retrieve configuration file (status !=200)');
                                }
                            }
                        };
                        xmlhttp.send(null);
                    }
                    else {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: configurationUrl,
                            headers: { 'Access-Control-Allow-Credentials': 'true' },
                            onload: function (response) {
                                if (response.status === 200) {
                                    configuration = JSON.parse(response.responseText);
                                    const M = new menu_1.Menu(configuration);
                                    M.init();
                                }
                            }
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                }
            })();
        }
    };
});
