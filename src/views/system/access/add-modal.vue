<template>
  <a-modal
      title="新增菜单"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
  <SchemaForm ref="dynamicForm" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, onMounted, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {useAsync} from '/@/hooks'
import {SchemaForm} from '/@/components/JSON-schema-form/index'
import { BasicForm, FormSchema } from '/@/components/form/index'
import { getRolePage, addMenu } from '/@/api/system'
import { addSchema } from './add-schema'

export default defineComponent({
  name: "add-modal",
  components: { [Modal.name]: Modal, SchemaForm},
  props: {
    remove: { // 移除模态框
      type: Function
    },
    callback: {
      type: Function
    },
    type: {
        type: String
    }
  },
  setup(props) {
    const dynamicForm = ref<any>(null)

    const state = reactive({
      visible: true,
      confirmLoading: false,
      dynamicValidateForm: addSchema
    })

    const handleOk = () => {
      state.confirmLoading = true;
      console.log('dynamicForm.value.modelRef.roles', dynamicForm.value.modelRef.roles)
      dynamicForm.value.validate()
          .then( async res => {
            const param = {
              ...dynamicForm.value.modelRef,
              // roles: dynamicForm.value.modelRef.roles
            }
            await useAsync(addMenu(param), {ref: state, loadingName: 'confirmLoading'})
            state.visible = false;
            props.callback && props.callback()
          })
          .catch(err => {
            console.log('error', err);
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
