/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js'


describe('pushToHistory', () => {
    test('Push to settings page with history stack length 2', () => {
      var history = pushToHistory('settings')
      expect(history.state["page"]).toBe('settings');
      expect(history.length).toBe(2);
    });
});

describe('pushToHistory', () => {
    test('Push to entry1 with history stack length 3', () => {
      var history = pushToHistory('entry', 1)
      expect(history.state["page"]).toBe('entry1');
      expect(history.length).toBe(3);
    });
});

describe('pushToHistory', () => {
    test('Push to HomePage with history stack length 4', () => {
      var history = pushToHistory('homePage')
      expect(history.state["page"]).toBe(undefined);
      expect(history.length).toBe(4);
    });
});

