import { VNode, CellProps, ColumnDataSchemaModel, HyperFunc } from '@revolist/revogrid';
import numeral, { Numeral } from 'numeral';

const defaultFormat: string = '0,0[.]00';

export default class NumberColumnType {
    private readonly numberFormat: string;
    constructor(format?: string, private emiter?: (event: string, instance: Numeral) => void) {
        if (!format) {
            this.numberFormat = defaultFormat;
        } else {
            this.numberFormat = format;
        }
    }
    columnProperties = (): CellProps => ({ class: { ['align-center']: true }});

    cellProperties = (): CellProps => ({ class: { ['align-right']: true } });

    cellTemplate = (_h: HyperFunc<VNode>, p: ColumnDataSchemaModel): string => {
        const parsed = parseFloat(p.model[p.prop]);
        if (isNaN(parsed)) {
            return '';
        }
        return this.formated(parsed);
    };

    formated(val: number): string {
        const num = numeral(val);
        if (this.emiter) {
            this.emiter('beforeValueFormatted', num);
        }
        return num.format(this.numberFormat)
    }
    
    /** Get numeral instance in case you don't want to add any in your project */
    static getNumeralInstance() {
        return numeral;
    }
}
