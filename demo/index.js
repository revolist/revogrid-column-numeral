import { defineCustomElements } from '@revolist/revogrid/loader';
import NumberColumnType from '@revolist/revogrid-column-numeral';
defineCustomElements();
const numeral = NumberColumnType.getNumeralInstance();

// If Numeral already ships lt locale, just switch:
numeral.register('locale', 'fr', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '€'
    }
});
numeral.locale('fr');

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('revo-grid');
  grid.addEventListener('beforeedit', (e) => {
    console.log(e.detail);
  })
  grid.columns = [
    {
      prop: 'number',
      columnType: 'numeric',
    },
  ];

  grid.source = [
    {
      number: 2.2,
    },
  ];
  grid.columnTypes = {
    numeric: new NumberColumnType('0,0.00 $', (eventName, num) => {
      // For example, enforce locale per column:
      console.log(eventName, num);
    }),
  };
});
