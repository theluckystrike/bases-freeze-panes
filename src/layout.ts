// Pure layout logic for frozen columns. No Obsidian imports, so vitest and the golden vectors
// in packages/spec/vectors/bases-freeze-panes.json run it directly.

/** Most columns a user can freeze. More than 3 would cover most of a narrow pane. */
export const MAX_FROZEN = 3;

export interface PlannedCell {
	/** Column index in the table's column order. */
	index: number;
	/** Distance in pixels from the start edge of the table to the start of this column. */
	start: number;
	width: number;
	frozen: boolean;
}

export interface RowPlan {
	/** Frozen columns after clamping to 0..MAX_FROZEN and to the number of columns. */
	frozen: number;
	/** Index of the last column when it is pinned to the end edge (Pro), else null. */
	end: number | null;
	/** Cells to keep in the row, in column order: every frozen column, then every column in view. */
	cells: PlannedCell[];
}

/** Turns any stored value into a whole number of frozen columns from 0 to MAX_FROZEN. */
export function clampColumns(value: unknown, fallback: number): number {
	const n = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
	if (typeof n !== 'number' || !Number.isFinite(n)) return fallback;
	return Math.min(MAX_FROZEN, Math.max(0, Math.round(n)));
}

/**
 * Plans one table row. A column stays in the row when it is frozen, or when any part of it lies
 * between left and right (the same test the core table uses, so the visible cells do not change).
 * pinLast keeps the last column too and pins it to the end edge, unless it is already a frozen column.
 * Returns null when the widths are not usable numbers; the caller then leaves the row to the core code.
 */
export function planRow(widths: readonly number[], frozen: number, left: number, right: number, pinLast = false): RowPlan | null {
	if (!Array.isArray(widths) || !Number.isFinite(left) || !Number.isFinite(right)) return null;
	const list: number[] = [];
	for (const w of widths as readonly unknown[]) {
		if (typeof w !== 'number' || !Number.isFinite(w) || w < 0) return null;
		list.push(w);
	}
	const count = Math.min(clampColumns(frozen, 0), list.length);
	const last = pinLast === true && list.length - 1 >= count ? list.length - 1 : null;
	const cells: PlannedCell[] = [];
	let start = 0;
	list.forEach((width, index) => {
		const end = start + width;
		const isFrozen = index < count;
		if (isFrozen || index === last || (end >= left && start <= right)) cells.push({ index, start, width, frozen: isFrozen });
		start = end;
	});
	return { frozen: count, end: last, cells };
}
