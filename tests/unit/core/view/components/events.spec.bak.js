import {
	expect
} from 'chai'

import {
	mount
} from '@vue/test-utils'

global.COMPONENTS.forEach(function(componentName) {
	describe('组件`' + componentName + '`', () => {
		global.EVENTS.forEach(name => {
			it('事件`' + name + '`', () => {
				let triggered = false
				const wrapper = mount({
					render(createElement) {
						return createElement('view', {
							on: {
								[name]() {
									triggered = true
								}
							}
						})
					}
				})
				wrapper.trigger(name)
				expect(triggered).eq(true)
			})
		})
	})

})
