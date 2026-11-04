import { isBuiltInElement } from '../../helpers/util'
import { createNativeEvent } from './componentInstance'

export function normalizeVaporNativeEvent(event: Event): Event {
  const { currentTarget } = event
  if (
    !(event instanceof Event) ||
    !(currentTarget instanceof HTMLElement) ||
    !isBuiltInElement(currentTarget)
  ) {
    return event
  }
  return createNativeEvent(event) as Event
}
