'use strict';

import * as util from "util";
export const lib = 'your lib name.';
import * as assert from 'assert';

const goodKeys = {
  'integer': 1,
  'string': 1,
  'number': 1,
  'function': 1,
  'boolean': 1,
  'null': 1,
  'undefined': 1,
  'symbol': 1,
  'integer/required': 1,
  'string/required': 1,
  'number/required': 1,
  'function/required': 1,
  'boolean/required': 1,
  'symbol/required': 1
};

export type Key =
  'integer' |
  'string' |
  'number' |
  'function' |
  'boolean' |
  'null' |
  'undefined' |
  'symbol';

const keys = Object.keys(goodKeys);

export interface OptsKeys {
  [key: string]: Key
}

export const getSelectable = function (z: OptsKeys, o: any) {
  return Object.keys(z).reduce((a, b) => {
    
    switch (z[b]) {
      
      case 'integer':
        assert.equal(typeof a[b], 'number', 'Fields needs to be a number');
        assert(Number.isInteger(a[b]), 'Field needs to be an integer.');
        break;
      
      default:
        throw new Error(`The following opts object has a bad option key: ${util.inspect(z)}`)
      
    }
    
    return ((a[b] = o[b]), a);
    
  }, {} as any);
};

export const initSelectable = function (a: OptsKeys) {
  return function (o: any) {
    return getSelectable(a, o);
  }
};
