<template>
  <a-modal
      title="关联权限"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <SchemaForm  ref="dynamicForm" :fields="fields" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, onMounted, markRaw} from 'vue'
import {Modal} from 'ant-design-vue'
import {useAsync} from "/@/hooks"
import {SchemaForm} from '/@/components/JSON-schema-form/index'
import { BasicForm, FormSchema } from '/@/components/form/index'
import { getRolePage, updateRole, getRoleAccess, resetRoleMenu} from "/@/api/system"
import AccessTree from './components/access-tree.vue'

export const addSchema: FormSchema = {
    style: {
        width: "auto"
    },
    formItemLayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    },
    formItem: [
        {
            type: markRaw(AccessTree),
            label: "拥有权限",
            field: "menuIds",
            value: [],
            asyncValue: async (currentValue, formInstance) => {
                const {roleId} = formInstance?.props.fields as any
                const params = {
                  "exceptMenuType": null,
                  "roleIds": [roleId]
                }
                // 获取角色列表
                const res = await getRoleAccess(params)
                // 设置角色复选框选项
                return res.result.map(item => item.menuId)
            }
        }
    ]
}

export default defineComponent({
  name: "edit-modal",
  components: { [Modal.name]: Modal, SchemaForm},
  props: {
    remove: { // 移除模态框
      type: Function
    },
    fields: {
      type: Object
    },
    callback: {
      type: Function
    }
  },
  setup(props) {
    const dynamicForm = ref<any>(null)

    const state = reactive({
      visible: true,
      confirmLoading: false,
      dynamicValidateForm: addSchema
    })

    const handleOk = async () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            const {roleId, menuIds} = dynamicForm.value.modelRef
            // console.log(dynamicForm.value.modelRef)
            const params = {
              roleId,
              menuIds: menuIds
            }
            const result = await useAsync(resetRoleMenu(params), {ref: state, loadingName: 'confirmLoading'})
            state.visible = false;
            props.callback && props.callback()
          })
          .catch(err => {
            console.log('error', err)
            state.confirmLoading = false
          })
    }

    return {
      ...toRefs(state),
      handleOk,
      dynamicForm,
    }
  }
})
</script>

<style scoped>
</style>
