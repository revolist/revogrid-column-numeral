import assert from 'node:assert/strict';
import test from 'node:test';
import NumberColumnType from '../dist/revo-column-number.mjs';

const numeral = NumberColumnType.getNumeralInstance();
numeral.register('locale', 'test-space-comma', {
  ...numeral.localeData('en'),
  delimiters: { thousands: ' ', decimal: ',' },
});

function editValue(initialValue, draft) {
  const { editor: Editor } = new NumberColumnType('0,0.0');
  const editor = new Editor({});
  editor.editCell = { val: initialValue };
  editor.editInput = { value: draft };
  return editor.getValue();
}

test('localizes existing numeric drafts without changing the saved value', async () => {
  numeral.locale('test-space-comma');
  const { editor: Editor } = new NumberColumnType('0,0.0');
  const editor = new Editor({});
  editor.editCell = { val: 100000.5 };
  editor.editInput = { value: '100000.5', focus() {} };

  await editor.componentDidRender();
  assert.equal(editor.editInput.value, '100000,5');
  assert.equal(editor.getValue(), 100000.5);

  editor.editInput.value += '6';
  await editor.componentDidRender();
  assert.equal(editor.editInput.value, '100000,56');
  assert.equal(editor.getValue(), 100000.56);
});

test('parses changed drafts with the active locale', () => {
  numeral.locale('test-space-comma');
  assert.equal(editValue(1, '100 000,5'), 100000.5);
  assert.equal(editValue(1, ''), '');
  assert.equal(editValue(1, 'invalid'), 'invalid');

  numeral.locale('en');
  assert.equal(editValue(1, '100 000'), 100000);
  assert.equal(new NumberColumnType('0,0.0').formatted(100000), '100,000.0');
});
