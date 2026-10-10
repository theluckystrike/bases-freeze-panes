import { describe, expect, it } from 'vitest';
import { App } from 'obsidian-test-mocks/obsidian';
import BasesFreezePanesPlugin from '../src/main';
import { DEFAULT_SETTINGS } from '../src/scope';
import manifest from '../manifest.json';

function makePlugin() {
	const app = App.createConfigured__({ files: { 'notes/a.md': '# Hello world' } });
	return new BasesFreezePanesPlugin(app as never, manifest as never);
}

describe('BasesFreezePanesPlugin', () => {
	it('loads default settings from an empty data.json', async () => {
		const plugin = makePlugin();
		await plugin.loadSettings();
		expect(plugin.settings).toEqual(DEFAULT_SETTINGS);
	});

	it('uses the default column count for a table outside any tab', async () => {
		const plugin = makePlugin();
		await plugin.loadSettings();
		expect(plugin.columnsFor(document.createElement('div'))).toBe(1);
	});

	it('reads the column count that refresh wrote on the tab element', async () => {
		const plugin = makePlugin();
		await plugin.loadSettings();
		const tab = document.createElement('div');
		tab.setAttribute('data-bfp-columns', '3');
		const view = tab.appendChild(document.createElement('div'));
		expect(plugin.columnsFor(view)).toBe(3);
	});

	it('without Pro caps the default at 1 column and never pins the last column', async () => {
		const plugin = makePlugin();
		await plugin.loadSettings();
		plugin.settings = { ...plugin.settings, columns: 3, freezeLast: true };
		expect(plugin.isPro()).toBe(false);
		expect(plugin.columnsFor(document.createElement('div'))).toBe(1);
		expect(plugin.pinLastFor(document.createElement('div'))).toBe(false);
	});
});
