import type {
  VNode,
  CellProps,
  ColumnDataSchemaModel,
  HyperFunc,
  ColumnProperties,
  ColumnRegular,
} from '@revolist/revogrid';
import numeral, { Numeral } from 'numeral';

const defaultFormat = '0,0[.]00';

export default class NumberColumnType implements ColumnProperties {
  private numberFormat = defaultFormat;
  constructor(
    format?: string,
    private emitter?: (event: string, instance: Numeral) => void,
  ) {
    if (format) {
      this.numberFormat = format;
    }
  }
  columnProperties = (): CellProps => ({ class: { ['align-center']: true } });

  cellProperties = (): CellProps => ({ class: { ['align-right']: true } });

  cellTemplate = (_: HyperFunc<VNode>, p: ColumnDataSchemaModel) => {
    return this.cellParser(p.model, p.column);
  };

  cellParser = (model: any, column: ColumnRegular): any => {
    const parsed = parseFloat(model[column.prop]);
    if (isNaN(parsed)) {
      return '';
    }
    return this.formatted(parsed);
  };

  formatted(val: number): string {
    const num = numeral(val);
    if (this.emitter) {
      this.emitter('beforeValueFormatted', num);
    }
    return num.format(this.numberFormat);
  }

  /** Get numeral instance in case you don't want to add any in your project */
  static getNumeralInstance() {
    return numeral;
  }
}
