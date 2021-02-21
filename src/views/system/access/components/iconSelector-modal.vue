<template>
  <a-modal
      title=""
      v-model:visible="visible"
      :footer="null"
  >
    <icon-selector @change="handleIconChange"/>
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, onMounted, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import { IconSelector } from '/@/components/IconSelector/index'

export default defineComponent({
  name: 'IconSelectorView',
  components: { [Modal.name]: Modal, IconSelector},
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
  setup(props, {emit}) {
    const state = reactive({
      visible: true,
      confirmLoading: false
    })

    const handleIconChange= (icon) => {
      props.callback && props.callback(icon)
      state.visible = false
    }

    return {
      ...toRefs(state),
      handleIconChange
    }
  }
})

</script>
