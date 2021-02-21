<template>
    <div>
        <a-input
            @click="iconselect"
            :placeholder="iconCode?'':'选择图标'"
            ><template v-if="iconCode" #prefix><icon-font :type="iconCode" size="18"></icon-font></template>
            <template v-if="iconCode" #suffix>
                <icon-font type="icon-yuanhuan-guanbi" size="18" color='#a0a0a0' @click="emitEmpty" />
            </template>
         </a-input>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, computed, onMounted} from 'vue'
import {Input} from 'ant-design-vue'
import {useCreateModal} from "/@/hooks"
import {IconFont} from '/@/components/iconfont'
import IconSelectorModal from './iconSelector-modal.vue'

export default defineComponent({
    name: "access-icon",
    components: {[Input.name]: Input, IconFont, IconSelectorModal},
    emits: ['update:value'], // 双向数据绑定
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    setup(props, {emit}) {
        const state = reactive({
            iconItem: {
                code: "",
                title: ""
            }
        })

        let iconCode = computed({
            get: () => props.value,
            set: (val: any) => emit('update:value', val),
        })

        const iconselect = () => {
            useCreateModal(IconSelectorModal, {
                fields: {a:'222'},
                callback: (icon) => {
                    iconCode.value = icon.code
                }
            })
        }

        const emitEmpty = () =>{
            iconCode.value = ''
        }

        return{
            ...toRefs(state),
            iconCode,
            iconselect,
            emitEmpty
        }
    }
})
</script>

<style lang="scss" scoped>

</style>