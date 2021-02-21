<template>
  <a-modal
      title="编辑单位"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
    <SchemaForm  ref="dynamicForm"  :fields="{...fields, roles:fields?.roleId }" :dynamic-validate-form="dynamicValidateForm" />
    <!-- :fields="{...fields,roles:fields?.roles.map(item => item.userId)}"  -->
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {useAsync} from "/@/hooks"
import {SchemaForm} from '/@/components/JSON-schema-form/index'
import { updateOrganization} from "/@/api/system"
import { addSchema } from './add-schema'

export default defineComponent({
  name: "edit-modal",
  components: { [Modal.name]: Modal, SchemaForm },
  props: {
    remove: { // 移除模态框
      type: Function
    },
    fields: {
      type: Object
    },
    callback: {
      type: Function
    },
    type: {
        type: String
    }
  },
  setup(props) {
    console.log(props.type)
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
            const {username, roles} = dynamicForm.value.modelRef
            const params = {
              ...dynamicForm.value.modelRef
            }
            await useAsync(updateOrganization(params), {ref: state, loadingName: 'confirmLoading'})
            state.visible = false;
            props.callback && props.callback()
          })
          .catch(err => {
            console.log('error', err)
            state.confirmLoading = false
          });
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
