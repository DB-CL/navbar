import { Environment } from './environment';

/**
 * Object used to manage values stored in GM_setvalue store
 * It also allow double behaviour with dev mode (GM functions not available)
 */
export class Store {
    static _instance: Store;
    private _expanded = true;
    private _folded = true;
    static getInstance(): Store {
        if (Store._instance === undefined) {
            Store._instance = new Store();
        }
        return Store._instance;
    }

    getExpanded(): boolean {
        if (Environment.getInstance().devMode !== true) {
            const expanded = GM_getValue('expanded');
            if (expanded !== undefined && expanded !== null) {
                this._expanded = !!GM_getValue('expanded');
            }
        }
        return this._expanded;
    }

    getFolded(): boolean {
        if (Environment.getInstance().devMode !== true) {
            const folded = GM_getValue('folded');
            if (folded !== undefined && folded !== null) {
                this._folded = !!GM_getValue('folded');
            }
        }
        return this._folded;
    }

    toggleExpanded(): boolean {
        this._expanded = !this._expanded;
        if (Environment.getInstance().devMode !== true) {
            GM_setValue('expanded', this._expanded);
        }
        return this._expanded;
    }

    toggleFolded(): boolean {
        this._folded = !this._folded;
        if (Environment.getInstance().devMode !== true) {
            GM_setValue('folded', this._folded);
        }
        return this._folded;
    }
}
