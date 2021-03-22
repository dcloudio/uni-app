export function PolySymbol(name: string) {
  return Symbol(__DEV__ ? '[uni-app]: ' + name : name)
}
