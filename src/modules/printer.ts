import { default as chalk } from 'chalk';
import { Color } from '../enums';
import { Printer as IPrinter } from '../../typings';

const print = (options = {}) => {

}

const wrap = (text, color = Color.Gray) => chalk[color](`[${text}] `);

export class Printer {
  static info(message: IPrinter.Message = '', header: string = 'Info') {
    header = wrap(header, Color.Cyan);
  }

  static success(message: IPrinter.Message = '', header: string = 'Ok') {
    header = wrap(header, Color.Green);
  }

  static warn(message: IPrinter.Message = '', header: string = 'Warning') {
    header = wrap(header, Color.Yellow);
  }

  static error(message: IPrinter.Message = '', header: string = 'Error') {
    header = wrap(header, Color.Red);
    print();
  }
}
