import { Environment as env } from './environment';

/**
 * Fold arrow (minified menu)
 */
export class FoldArrow {
    private _html: HTMLElement;

    get html(): HTMLElement {
        return this._html;
    }

    constructor() {
        this._html = document.createElement('div');
        this.build();
    }

    private async build() {
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
        this._html.style.zIndex = '99999';

        const arrowIcon = document.createElement('img');
        if (env.getInstance().devMode === true) {
            arrowIcon.src = env.getInstance().url + '/assets/fa-arrow-down.png';
        } else {
            arrowIcon.src = await GM_getResourceURL('fa-arrow-down');
        }
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
}
