import {
  isFn
} from 'uni-shared'

const todoApis = Object.create(null)

const TODOS = [
  'onTabBarMidButtonTap',
  'subscribePush',
  'unsubscribePush',
  'onPush',
  'offPush',
  'share'
]

function createTodoApi (name) {
  return function todoApi ({
    fail,
    complete
  }) {
    const res = {
      errMsg: `${name}:fail method '${name}' not supported`
    }
    isFn(fail) && fail(res)
    isFn(complete) && complete(res)
  }
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name)
})

export default todoApis
