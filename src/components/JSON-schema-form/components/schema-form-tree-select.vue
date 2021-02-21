<template>
  <a-tree-select v-model:value="modelValue"  v-on="formItem.eventObject" v-bind="formItem.props"
    :treeData="treeData"
    allow-clear
  ></a-tree-select>
</template>
<script lang="ts">
import {defineComponent, PropType, reactive, computed, onMounted, toRefs} from 'vue'
import {TreeSelect} from 'ant-design-vue'
import { FormItem } from "../types/form"

export default defineComponent({
  name: 'schema-form-tree-select',
  emits: ['update:value'],
  components: {
    [TreeSelect.name]: TreeSelect,
  },
  props: {
    formItem: { // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  setup(props, {attrs, emit}) {
    
    const state = reactive({
      treeData: []
    })

    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    })

    onMounted(()=>{
      props.formItem?.options().then(res=>{
        state.treeData = res
      })
    })

    return {
      ...toRefs(state),
      modelValue,
      treeExpandedKeys: [],
      value: [],
    }
  }
})
</script>
