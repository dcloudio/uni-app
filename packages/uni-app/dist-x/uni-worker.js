(function () {
	'use strict';

	class WorkerTaskImpl {
	}
	// @ts-expect-error
	globalThis.WorkerTaskImpl = WorkerTaskImpl;

})();
