import {
	expect
} from 'chai'

import {
	mount
} from '@vue/test-utils'


describe('组件`view`', () => {

	const hoverStartTime = 50
	const hoverStayTime = 400

	function itHoverStopPropagation(hoverStopPropagation, done) {

		const wrapper = mount({
			render(createElement) {
				return createElement('v-uni-view', {
					'class': 'parent',
					props: {
						hoverClass: 'parent-hover'
					}
				}, [createElement('v-uni-view', {
					'class': 'child',
					props: {
						hoverClass: 'child-hover',
						hoverStopPropagation,
						hoverStartTime,
						hoverStayTime
					}
				})])
			}
		})

		const parentWrapper = wrapper.find('.parent')
		const childWrapper = wrapper.find('.child')
		childWrapper.trigger('touchstart', {
			touches: [{}]
		})
		expect(childWrapper.is('.child-hover')).eq(false)

		setTimeout(function() { //hover-class

			expect(childWrapper.is('.child-hover')).eq(true)
			expect(parentWrapper.is('.parent-hover')).eq(!hoverStopPropagation)

			childWrapper.trigger('touchend')
			setTimeout(function() {
				expect(childWrapper.is('.child-hover')).eq(false)
				expect(parentWrapper.is('.parent-hover')).eq(false)
				done()
			}, hoverStayTime + 100)

		}, hoverStartTime + 100)


	}

	it('hoverStopPropagation=false', done => {
		itHoverStopPropagation(false, done)
	})

	it('hoverStopPropagation=true', done => {
		itHoverStopPropagation(true, done)
	})

})
