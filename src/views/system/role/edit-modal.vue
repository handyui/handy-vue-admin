<template>
  <a-modal
      title="编辑角色"
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
import {addSchema} from "./add-schema"
import {SchemaForm} from '/@/components/JSON-schema-form/index'
import { BasicForm, FormSchema } from '/@/components/form/index'
import { getRolePage, updateRole} from "/@/api/system"
import AccessTree from './components/access-tree.vue'

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
            const {roleName, roleId, roleCode, accessIdsList} = dynamicForm.value.modelRef

          const params = {
              ...dynamicForm.value.modelRef,
              // accessIdsList: accessIdsList.toString()
            }
            console.log('params', params)
            const result = await useAsync(updateRole(params), {ref: state, loadingName: 'confirmLoading'})
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
