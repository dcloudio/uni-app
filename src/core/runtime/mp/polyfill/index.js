import {
  initState
} from './state/index'

import {
  initMethods
} from './methods'

import {
  initRelations,
  handleRelations
} from './relations'

import {
  handleObservers
} from './observers'

export default {
  beforeCreate () {
    initState(this)
    initMethods(this)
    initRelations(this)
  },
  created () {
    handleRelations(this, 'linked')
  },
  mounted () {
    handleObservers(this)
  },
  beforeDestroy () {
    handleRelations(this, 'unlinked')
  }
}
