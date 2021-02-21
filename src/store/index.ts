import { createStore } from 'vuex'

import getters from './getters'
import layout from './modules/layout'
import user from './modules/user'
import permission from './modules/permission'

export default createStore({
    modules: {
		layout,
		user,
		permission
	},
	getters,
})
