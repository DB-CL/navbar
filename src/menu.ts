import { Row } from './row';
import { Environment as env } from './environment';
import { FoldArrow } from './foldArrow';
import { Store } from './store';

/**
 * Describe an app
 */
export interface AppData {
    name: string;
    icon: string;
    url: string;
}

/**
 * Describe the JSON configuration file
 */
export interface MenuData {
    iconSize: number;
    title: string;
    width: number;
    apps: Array<AppData>;
}

/**
 * Main menu
 */
export class Menu {
    private _data: MenuData;
    private _html: HTMLElement;
    private _foldArrow: FoldArrow;
    private _expanded: boolean;
    private _folded: boolean;
    private _apps: Array<Row> = new Array();

    /**
     * Accessors from the JSON configuration file
     */
    get width(): number { return this._data.width; }
    get apps(): Array<AppData> { return this._data.apps; }
    get iconSize(): number { return this._data.iconSize; }
    get title(): string { return this._data.title; }

    constructor(data: MenuData) {
        this._data = data;

        this._expanded = Store.getInstance().getExpanded();
        this._folded = Store.getInstance().getFolded();

        this._foldArrow = new FoldArrow();

        this._html = document.createElement('div');
        this.build();
    }

    /**
     * Build the HTML of the menu
     */
    private build() {
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
        } else {
            this.reduce();
        }

        if (!this._folded) {
            this.show();
            this._foldArrow.hide();
        } else {
            this.hide();
            this._foldArrow.show();
        }
    }

    private hide() {
        this._html.style.display = 'none';
    }

    private show() {
        this._html.style.display = 'flex';
    }

    private toggleFolded() {
        if (this._folded) {
            this.show();
            this._foldArrow.hide();
        } else {
            this.hide();
            this._foldArrow.show();
        }
        this._folded = Store.getInstance().toggleFolded();
    }

    private reduce() {
        this._html.style.width = (20 + this.iconSize ) + 'px';
        document.querySelectorAll('.expanded-only').forEach((element) => {
            (element as HTMLElement).style.display = 'none';
        });
        this._apps.forEach(row => {
            row.enableTooltip();
        });
    }

    private expand() {
        this._html.style.width = '220px';
        document.querySelectorAll('.expanded-only').forEach((element) => {
            (element as HTMLElement).style.display = 'block';
        });
        this._apps.forEach(row => {
            row.disableTooltip();
        });
    }

    private toggleExpanded() {
        if (this._expanded) {
            this.reduce();
        } else {
            this.expand();
        }
        this._expanded = Store.getInstance().toggleExpanded();
    }

    private buildHeader() {
        const menu = this._html;
        const header = document.createElement('div');
        header.style.width = '100%';
        header.style.height = '40px';
        header.style.backgroundColor = '#3a4248';
        header.style.display = 'flex';
        header.style.flexDirection = 'row';
        header.style.alignItems = 'center';

        const icon = document.createElement('img');
        icon.src = env.getInstance().url + '/assets/fa-menu.png';
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
        foldIcon.src = env.getInstance().url + '/assets/fa-arrow-up.png';
        foldIcon.style.height = '10px';
        foldIcon.style.width = '10px';
        foldIcon.style.margin = '10px';
        foldIcon.style.cursor = 'pointer';
        foldIcon.onclick = this.toggleFolded.bind(this);
        foldIcon.setAttribute('class', 'expanded-only');
        header.appendChild(foldIcon);

        menu.appendChild(header);
    }

    private buildRows() {
        this.apps.forEach((app) => {
            const row = new Row(app, this.iconSize);
            this._html.appendChild(row.html);
            this._apps.push(row);
        });
    }
}
