import { describe, expect, it } from 'vitest';
import vectors from './vectors/bases-freeze-panes.json';
import { clampColumns, planRow } from '../src/layout';

describe('golden vectors (packages/spec/vectors/bases-freeze-panes.json)', () => {
	for (const c of vectors.cases) {
		it(c.name, () => {
			const [widths, frozen, left, right, pinLast] = c.args as [number[], number, number, number, boolean?];
			expect(planRow(widths, frozen, left, right, pinLast)).toEqual(c.expected);
		});
	}
});

describe('planRow', () => {
	it('puts frozen cells first and keeps column order', () => {
		const plan = planRow([50, 60, 70, 80], 2, 120, 200);
		expect(plan?.cells.map((c) => c.index)).toEqual([0, 1, 2, 3]);
		expect(plan?.cells.filter((c) => c.frozen).map((c) => c.start)).toEqual([0, 50]);
	});

	it('gives each frozen cell the sum of the widths before it as its start offset', () => {
		const plan = planRow([120.5, 80, 300], 3, 1000, 1200);
		expect(plan?.cells.map((c) => c.start)).toEqual([0, 120.5, 200.5]);
	});

	it('returns null for widths that are not finite numbers', () => {
		expect(planRow([100, Number.NaN], 1, 0, 10)).toBeNull();
		expect(planRow([100], 1, Number.NaN, 10)).toBeNull();
	});
});

describe('clampColumns', () => {
	it('accepts numbers and numeric strings and clamps them to 0..3', () => {
		expect(clampColumns(2, 1)).toBe(2);
		expect(clampColumns('3', 1)).toBe(3);
		expect(clampColumns(-4, 1)).toBe(0);
		expect(clampColumns(9, 1)).toBe(3);
	});

	it('falls back for values that are not numbers', () => {
		expect(clampColumns('many', 1)).toBe(1);
		expect(clampColumns(null, 0)).toBe(0);
		expect(clampColumns('', 2)).toBe(2);
	});
});
