import {
  type VNode,
  type CellProps,
  type ColumnDataSchemaModel,
  type HyperFunc,
  type ColumnType,
  type ColumnRegular,
  TextEditor,
} from '@revolist/revogrid';
import numeral, { Numeral } from 'numeral';

const defaultFormat = '0,0[.]00';
/**
 * Editor which returns value as number
 */
class EditCell extends TextEditor {
  getValue(): any {
    const value = this.editInput?.value ?? '';
    if (!value.trim()) {
      return value;
    }
    const numeric = numeral(value).value();
    if (numeric === null || Number.isNaN(numeric)) {
      return value;
    }
    return numeric;
  }
}

export default class NumberColumnType implements ColumnType {
  constructor(
    private readonly numberFormat = defaultFormat,
    private emitter?: (event: string, instance: Numeral) => void,
  ) {
  }
  editor = EditCell;
  columnProperties = (): CellProps => ({ class: { ['align-center']: true } });

  cellProperties = (): CellProps => ({ class: { ['align-right']: true } });

  cellTemplate = (_: HyperFunc<VNode>, p: ColumnDataSchemaModel) => {
    return this.parse(p.model, p.column);
  };

  parse = (model: any, column: ColumnRegular): any => {
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
