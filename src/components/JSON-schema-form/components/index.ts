// const path = require('path')

// const file = require.context('./', true, /\.vue/)
// const components = {}
// file.keys().forEach(key => {
//     const name = path.basename(key, '.vue')
//     components[name] = file(key).default || file(key)
// })

// export default components


import {default as schemaFormCheckbox } from "./schema-form-checkbox.vue"
import {default as schemaFormInputNumber } from "./schema-form-input-number.vue"
import {default as schemaFormInput } from "./schema-form-input.vue"
import {default as schemaFormRadio } from "./schema-form-radio.vue"
import {default as schemaFormSelect } from "./schema-form-select.vue"
import {default as schemaFormSwitch } from "./schema-form-switch.vue"
import {default as schemaFormTextarea } from "./schema-form-textarea.vue"
import {default as schemaFormTreeSelect } from "./schema-form-tree-select.vue"


export { schemaFormCheckbox, schemaFormInputNumber, schemaFormInput, schemaFormRadio, schemaFormSelect, schemaFormSwitch, schemaFormTextarea, schemaFormTreeSelect }
