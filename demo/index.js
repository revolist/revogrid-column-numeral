import { defineCustomElements } from '@revolist/revogrid/loader';
import NumberColumnType from '@revolist/revogrid-column-numeral';
defineCustomElements();

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('revo-grid');
  grid.addEventListener('beforeedit', (e) => {
    console.log(e);
  })
  grid.columns = [
    {
      prop: 'number',
      columnType: 'numeric',
    },
  ];

  grid.source = [
    {
      number: 1,
    },
  ];
  grid.columnTypes = {
    numeric: new NumberColumnType('0,0'),
  };
});
