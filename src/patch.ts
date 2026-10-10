// Keeps the first columns of core Bases table rows in the DOM.
// The core table renders only the columns in view (column virtualization). Once the user scrolls
// right, the first cells are removed, so CSS position: sticky alone cannot keep them visible.
// This module wraps the shared row method that picks the cells, so frozen cells always stay in the row.
// Obsidian has no public hook for this. Every step checks the shape it expects and falls back to the
// core method (fail closed): if a future version changes the table, the header part keeps working
// and the columns are simply not frozen.
import type { App } from 'obsidian';
import { MAX_FROZEN, planRow, type RowPlan } from './layout';

export const FROZEN_CLASS = 'bfp-frozen';
export const LAST_CLASS = 'bfp-last';
export const ROW_CLASS = 'bfp-row';
/** The last column, pinned to the end edge (Pro). */
export const END_CLASS = 'bfp-end';

interface CellLike {
	el: HTMLElement;
}
interface RowLike {
	cells: CellLike[];
	el: HTMLElement;
	view?: { scrollEl?: unknown };
}
type Virtualize = (this: RowLike, widths: number[], left: number, right: number) => void;
interface RowProto {
	virtualize: Virtualize;
}

/** Returns how many columns to freeze for the table whose scroll box is el. */
export type ColumnsFor = (el: HTMLElement) => number;
/** Returns true when the last column of the table whose scroll box is el is pinned to the end edge. */
export type PinLastFor = (el: HTMLElement) => boolean;

export interface ColumnPatch {
	remove(): void;
}

/** Cross-window element check: cells in a pop-out window belong to that window's HTMLElement. */
const isElement = (v: unknown): v is HTMLElement =>
	typeof v === 'object' && v !== null && typeof (v as Partial<Node>).instanceOf === 'function' && (v as Node).instanceOf(HTMLElement);

const isRow = (row: unknown): row is RowLike => {
	if (typeof row !== 'object' || row === null) return false;
	const r = row as Partial<RowLike>;
	return isElement(r.el) && Array.isArray(r.cells) && r.cells.every((c) => isElement(c?.el));
};

/** Walks up the prototype chain to the object that owns virtualize. */
function ownerOfVirtualize(obj: unknown): RowProto | null {
	let proto: unknown = obj;
	for (let depth = 0; depth < 6 && typeof proto === 'object' && proto !== null; depth++) {
		if (Object.prototype.hasOwnProperty.call(proto, 'virtualize')) {
			const fn = (proto as Partial<RowProto>).virtualize;
			return typeof fn === 'function' && fn.length === 3 ? (proto as RowProto) : null;
		}
		proto = Object.getPrototypeOf(proto);
	}
	return null;
}

function headerOf(tableView: unknown): unknown {
	if (typeof tableView !== 'object' || tableView === null) return null;
	const header = (tableView as { header?: unknown }).header;
	return isRow(header) ? header : null;
}

/** A table view from an open .base tab, if one is open. */
function openTableHeader(app: App): unknown {
	for (const leaf of app.workspace.getLeavesOfType('bases')) {
		const controller = (leaf.view as unknown as { controller?: { view?: unknown } }).controller;
		const header = headerOf(controller?.view);
		if (header) return header;
	}
	return null;
}

/** Unloads a view if it is a Component. Best effort: a view that never loaded has nothing to release. */
function unloadView(view: unknown): void {
	const unload = (view as { unload?: unknown } | null)?.unload;
	if (typeof unload !== 'function') return;
	try {
		(unload as () => void).call(view);
	} catch {
		// Nothing to release.
	}
}

/**
 * Builds one detached table view through the core registration, only to read its row class, then
 * unloads it and removes its element at once. The plugin keeps only the shared row prototype.
 */
function detachedTableHeader(app: App): unknown {
	const plugins = (app as unknown as { internalPlugins?: { getPluginById?: (id: string) => unknown } }).internalPlugins;
	const bases = plugins?.getPluginById?.('bases') as { instance?: { registrations?: Record<string, { factory?: unknown }> } } | undefined;
	const factory = bases?.instance?.registrations?.table?.factory;
	if (typeof factory !== 'function') return null;
	const el = createDiv();
	let view: unknown = null;
	try {
		view = (factory as (controller: unknown, el: HTMLElement) => unknown)({ app }, el);
		return headerOf(view);
	} catch {
		return null;
	} finally {
		unloadView(view);
		el.remove();
	}
}

export function findRowPrototype(app: App): RowProto | null {
	const header = openTableHeader(app) ?? detachedTableHeader(app);
	return header ? ownerOfVirtualize(header) : null;
}

function clearEnd(row: RowLike): void {
	const el = row.cells[row.cells.length - 1]?.el;
	if (el?.hasClass(END_CLASS)) {
		el.removeClass(END_CLASS);
		el.style.removeProperty('margin-inline-start');
	}
}

function clearMarks(row: RowLike): void {
	row.el.removeClass(ROW_CLASS);
	for (let i = 0; i < Math.min(MAX_FROZEN, row.cells.length); i++) row.cells[i]?.el.removeClass(FROZEN_CLASS, LAST_CLASS);
	clearEnd(row);
}

function scopeOf(row: RowLike): HTMLElement {
	const scroll = row.view?.scrollEl;
	return isElement(scroll) ? scroll : row.el;
}

/**
 * Keeps the planned cells in the row: frozen cells first, each at its own start offset.
 * The pinned last cell is in the flex flow right after the frozen cells; a start margin puts it back at
 * its own offset, and position: sticky with inset-inline-end: 0 then holds it at the end edge.
 */
function applyPlan(row: RowLike, plan: RowPlan): void {
	const keep: HTMLElement[] = [];
	let frozenWidth = 0;
	clearEnd(row);
	for (const cell of plan.cells) {
		if (cell.frozen) frozenWidth += cell.width;
		const el = row.cells[cell.index]?.el;
		if (el && cell.index === plan.end) {
			el.addClass(END_CLASS);
			el.setCssStyles({ marginInlineStart: `${Math.max(0, cell.start - frozenWidth)}px` });
		}
	}
	for (const cell of plan.cells) {
		const el = row.cells[cell.index]?.el;
		if (!el) continue;
		// The pinned last cell must not keep a start offset: with both offsets set, sticky honors the start one.
		el.setCssStyles({ insetInlineStart: cell.index === plan.end ? 'auto' : `${cell.start}px`, width: `${cell.width}px` });
		el.toggleClass(FROZEN_CLASS, cell.frozen);
		el.toggleClass(LAST_CLASS, cell.frozen && cell.index === plan.frozen - 1);
		keep.push(el);
	}
	for (let i = plan.frozen; i < Math.min(MAX_FROZEN, row.cells.length); i++) row.cells[i]?.el.removeClass(FROZEN_CLASS, LAST_CLASS);
	row.el.addClass(ROW_CLASS);
	row.el.setChildrenInPlace(keep);
}

/** Wraps the row method. Returns null (and changes nothing) when the table is not the expected shape. */
export function installColumnPatch(app: App, columnsFor: ColumnsFor, pinLastFor: PinLastFor = () => false): ColumnPatch | null {
	const proto = findRowPrototype(app);
	if (!proto) return null;
	const original = proto.virtualize;
	let active = true;
	const wrapped: Virtualize = function (this: RowLike, widths, left, right) {
		if (!active || !isRow(this)) {
			original.call(this, widths, left, right);
			return;
		}
		const scope = scopeOf(this);
		const count = columnsFor(scope);
		const pinLast = pinLastFor(scope);
		const plan = (count > 0 || pinLast) && widths.length >= this.cells.length ? planRow(widths, count, left, right, pinLast) : null;
		if (!plan || (plan.frozen === 0 && plan.end === null)) {
			clearMarks(this);
			original.call(this, widths, left, right);
			return;
		}
		applyPlan(this, plan);
	};
	proto.virtualize = wrapped;
	return {
		remove() {
			active = false;
			// Another plugin may have wrapped the method after us; then ours stays in the chain but only forwards.
			if (proto.virtualize === wrapped) proto.virtualize = original;
		},
	};
}
