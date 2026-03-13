import {
  arrayAt,
  arrayFind,
  arrayFindLast,
  arrayPop,
  arrayShift,
} from './Array'
import { UTSType, isInstanceOf } from './Class'
import { UTSJSON } from './JSON'
import { mapGet } from './Map'
import { stringAt, stringCodePointAt } from './String'
import { weakMapGet } from './WeakMap'

export const UTS = {
  arrayAt,
  arrayFind,
  arrayFindLast,
  arrayPop,
  arrayShift,
  isInstanceOf,
  UTSType,
  mapGet,
  stringAt,
  stringCodePointAt,
  weakMapGet,
  JSON: UTSJSON,
}
