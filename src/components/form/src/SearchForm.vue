<template>
  <a-form v-bind="searchValidateForm.formItemLayout"   layout="horizontal"> 
    <a-row :gutter="28">
    <template v-for="(formItem, index) in searchValidateForm.formItem.filter(item => !item.hidden)"
              :key="formItem.field">
      <a-col :md="5" :sm="24">
      <a-form-item
          :help="formItem.help"
          :extra="formItem.extra"
          v-bind="validateInfos[formItem.field]"
          :label="formItem.label"
          :labelCol="{span: 6}" :wrapperCol="{span: 17, offset: 1}"
      >
       <!--  自定义slots start-->
      <!-- <template v-for="(value, key) in $slots" v-slot:[key]="slotProps">
          <slot :name="key" v-bind="slotProps"></slot>
      </template> -->
     
       <!--        普通输入框 start-->
        <template v-if="formItem.type == 'input'">
          <a-input v-model:value="modelRef[formItem.field]" v-bind="formItem.props" v-on="formItem.eventObject" autocomplete="new-password"
          />
        </template>

        <!-- <a-range-picker v-if="formItem.type == 'timeRage'" v-model:value="modelRef[formItem.field]" v-bind="formItem.props" v-on="formItem.eventObject"/> -->
        <template v-if="formItem.type == 'timeRange'">
          <a-range-picker v-model:value="modelRef[formItem.field]" format="YYYY/MM/DD" />
        </template>

        <!--下拉选择器 start-->
        <template v-if="formItem.type == 'select'">
          <a-select v-model:value="modelRef[formItem.field]" v-on="formItem.eventObject" v-bind="formItem.props">
            <Option v-for="option in formItem.options" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </a-select>
        </template>

          <!--        普通输入框 end-->

      </a-form-item>
      </a-col>
      
    </template>
      <a-col :md="5" :sm="24">
        <span class="table-page-search-submitButtons">
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button v-if="reset" style="margin-left: 8px" @click="handleRest">重置</a-button>
        </span>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import {defineComponent, reactive, getCurrentInstance,nextTick, watch} from 'vue'
import components from "./components"
import {useForm} from "@ant-design-vue/use"
import {isString, isFunction} from '/@/utils/is'
import {formatToDate} from '/@/utils/dateUtil'

export default defineComponent({
  name: "dynamic-form",
  components,
  props: {
    searchValidateForm: { // 动态验证表单
      required: true,
      type: [Object]
    } as any,
    fields: { // 预置字段默认值
      type: Object,
      default: () => ({})
    },
    reset:{
      type: Boolean,
      default: true
    }
  },
  setup(props, {attrs, emit, slots}) {
    // 表单实例
    const formInstance = getCurrentInstance()

    // 表单布局
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }

    // 表单项
    const modelRef = reactive(props.searchValidateForm.formItem.reduce((previousValue, currentValue) => {
      currentValue.eventObject ??= {}
      // Object.keys(currentValue.eventObject).forEach(key => {
      //   const fn = currentValue.eventObject[key]
      //   currentValue.eventObject[key] = (...rest) => {
      //     fn(...rest, formInstance)
      //   }
      // })
      previousValue[currentValue.field] = currentValue.value
      return previousValue
    }, {}))
    // 如果有默认值，则覆盖
    props.fields && Object.assign(modelRef, props.fields)

    // 异步设置默认数据
    props.searchValidateForm.formItem.forEach(async item => {
      // 异步选项
      if (isFunction(item.asyncOptions)) {
        item.options = await item.asyncOptions(item, formInstance)
      } else if (isFunction(item.asyncValue)) { // 异步默认值
        modelRef[item.field] = await item.asyncValue(item, formInstance)
      }
    })

    // 表单验证规则
    const rulesRef = reactive(props.searchValidateForm.formItem.reduce((previousValue, currentValue) => {
      currentValue.rules && (previousValue[currentValue.field] = currentValue.rules)
      return previousValue
    }, {}))

    // console.log(modelRef, '表单')

    // console.log(rulesRef, '表单验证规则')

    const watchCallback = props.searchValidateForm.watchCallback ?? (() => ({}))

    // 是否有需要监测的字段
    props.searchValidateForm.watchKeys && watch(props.searchValidateForm.watchKeys.map(item => () => modelRef[item]), (curr, prev) => watchCallback(curr, {
      dynamicForm: props.searchValidateForm,
      modelRef
    }))

    // watch(props.searchValidateForm.watchKeys.map(item => () => modelRef[item]), eval(props.searchValidateForm.watchCallback))

    const {resetFields, validate, validateInfos} = useForm(modelRef, rulesRef);

    const handleSearch = () => {
      if('timeRange' in modelRef){
        modelRef['startDate'] = formatToDate(modelRef['timeRange'][0]) + '00:00:00'
        modelRef['endDate'] = formatToDate(modelRef['timeRange'][1]) + '23:59:59'
        delete modelRef['timeRange']
      }
      emit('callback', modelRef)
    }
    
    const handleRest = () => {
      resetFields()
    }

    return {
      formItemLayout,
      validate,
      isString,
      validateInfos,
      modelRef,
      handleSearch,
      handleRest,
    }
  }
})
</script>

<style lang="scss" scoped>
.ant-form {
  .ant-input-group {
    display: flex;
  }

  .ant-checkbox-wrapper {
    //margin-left: 0;
  }
  .ant-form-item{
    margin-bottom: 0;
  }
}
</style>
