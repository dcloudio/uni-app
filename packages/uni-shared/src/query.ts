import {
  LocationQueryRaw,
  stringifyQuery as stringifyLocationQuery
} from 'vue-router'
export function stringifyQuery(query?: LocationQueryRaw) {
  if (query) {
    const querystring = stringifyLocationQuery(query)
    if (querystring) {
      return '?' + querystring
    }
  }
  return ''
}
