before(function() {

	global.__uniConfig = {
		router: {
			mode: 'hash',
			base: '/'
		}
	}

	global.__uniRoutes = []

	require('../../../../../lib/h5/main')
})
