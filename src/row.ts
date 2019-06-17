import { AppData } from './menu';
import { Environment } from './environment';

export class Row {
    private _data: AppData;
    private _row: HTMLElement;
    private _icon: HTMLButtonElement;
    private _iconSize: number;
    private _selected = false;

    get icon(): string { return this._data.icon; }
    get url(): string { return this._data.url; }
    get name(): string { return this._data.name; }
    get html(): HTMLElement { return this._row; }

    /**
     * @thanks https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
     */
    static validURL(str: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    constructor(data: AppData, iconSize: number) {
        this._data = data;
        this._row = document.createElement('div');
        this._icon = document.createElement('button');
        this._iconSize = iconSize;
        this.build();
    }

    private async build() {
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
        } else {
            this._row.style.borderLeft = '3px solid transparent';
        }

        let url: string;
        if (Environment.getInstance().devMode === true) {
            url = (Row.validURL(this.icon)) ? this.icon : Environment.getInstance().url + '/assets/apps/64x/' + this.icon + '.png';
            this._icon.style.backgroundImage = 'url(' + url + ')';
        } else {
            (async () => {
                url = (Row.validURL(this.icon)) ? this.icon : await GM_getResourceURL(this.icon);
                this._icon.style.backgroundImage = 'url(' + url + ')';
            })();
        }
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
    private isSelected(): boolean {
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
}
