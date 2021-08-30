/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vuex = factory());
}(this, (function () { 'use strict';

  /**
   * Get the first item that pass the test
   * by second argument function
   *
   * @param {Array} list
   * @param {Function} f
   * @return {*}
   */
  function find (list, f) {
    return list.filter(f)[0]
  }

  /**
   * Deep copy the given object considering circular structure.
   * This function caches all nested objects and its copies.
   * If it detects circular structure, use cached copy to avoid infinite loop.
   *
   * @param {*} obj
   * @param {Array<Object>} cache
   * @return {*}
   */
  function deepCopy (obj, cache) {
    if ( cache === void 0 ) cache = [];

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    // if obj is hit, it is in circular structure
    var hit = find(cache, function (c) { return c.original === obj; });
    if (hit) {
      return hit.copy
    }

    var copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy: copy
    });

    Object.keys(obj).forEach(function (key) {
      copy[key] = deepCopy(obj[key], cache);
    });

    return copy
  }

  // Credits: borrowed code from fcomb/redux-logger

  function createLogger (ref) {
    if ( ref === void 0 ) ref = {};
    var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
    var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
    var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
    var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
    var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
    var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
    var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
    var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
    var logger = ref.logger; if ( logger === void 0 ) logger = console;

    return function (store) {
      var prevState = deepCopy(store.state);

      if (typeof logger === 'undefined') {
        return
      }

      if (logMutations) {
        store.subscribe(function (mutation, state) {
          var nextState = deepCopy(state);

          if (filter(mutation, prevState, nextState)) {
            var formattedTime = getFormattedTime();
            var formattedMutation = mutationTransformer(mutation);
            var message = "mutation " + (mutation.type) + formattedTime;

            startMessage(logger, message, collapsed);
            logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
            logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
            logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
            endMessage(logger);
          }

          prevState = nextState;
        });
      }

      if (logActions) {
        store.subscribeAction(function (action, state) {
          if (actionFilter(action, state)) {
            var formattedTime = getFormattedTime();
            var formattedAction = actionTransformer(action);
            var message = "action " + (action.type) + formattedTime;

            startMessage(logger, message, collapsed);
            logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
            endMessage(logger);
          }
        });
      }
    }
  }

  function startMessage (logger, message, collapsed) {
    var startMessage = collapsed
      ? logger.groupCollapsed
      : logger.group;

    // render
    try {
      startMessage.call(logger, message);
    } catch (e) {
      logger.log(message);
    }
  }

  function endMessage (logger) {
    try {
      logger.groupEnd();
    } catch (e) {
      logger.log('—— log end ——');
    }
  }

  function getFormattedTime () {
    var time = new Date();
    return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
  }

  function repeat (str, times) {
    return (new Array(times + 1)).join(str)
  }

  function pad (num, maxLength) {
    return repeat('0', maxLength - num.toString().length) + num
  }

  return createLogger;

})));
