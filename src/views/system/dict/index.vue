<template>
  <a-card :bordered="false">
    <SearchForm ref="searchForm" :search-validate-form="searchValidateForm" @callback="handleSearch"  />
    <BasicTable ref="tableRef" :columns="columns" :get-list-func="getDictionaryList" rowKey="dicCode" :row-selection="rowSelection">
       <template v-slot:title>
        <!-- <a-button v-permission="{ action: 'create', effect: 'disabled' }" @click="addItem" type="primary">
          添加
        </a-button>
        <a-button @click="deleteItems" v-permission="{ action: 'delete' }" :disabled="isDisabled" type="primary">
          删除
        </a-button> -->
        <a-button @click="addItem" type="primary">添加</a-button>
        <a-button @click="deleteItems" :disabled="isDisabled" type="primary">删除</a-button>
      </template> 
      <template v-slot:moduleName="{record}">
        <!-- <button @click="expand($event, record)" >ddd</button> -->
        <!-- <div @click="expand($event, record)" role="button" tabindex="0" class="ant-table-row-expand-icon ant-table-row-collapsed" aria-label="展开行"></div> -->
       <span :ref="el => itemRefs[record.menuId] = el">
          {{ record.title || record.name }}
        </span> 
      </template>
    </BasicTable>
  </a-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, reactive, toRefs,  createVNode, render, nextTick, computed, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {QuestionCircleOutlined, LoadingOutlined} from '@ant-design/icons-vue'
import {BasicTable} from '/@/components/table/index'
import {useCreateModal} from "/@/hooks"
import {deleteUsers, getDictionaryList, queryMenuList} from '/@/api/system'
import {columns} from "./columns"
import AddModal from './add-modal.vue'
import {SearchForm, FormSchema} from '/@/components/form'

export const searchFormSchema:FormSchema = {
  formItem: [
    {
        type: "input",
        label: "字典键",
        field: "dicCode",
        value: '',
        props: {
            placeholder: "请输入字典键"
        },
    },
    {
        type: "input",
        label: "字典值",
        field: "dicValue",
        value: '',
        props: {
            placeholder: "请输入字典值"
        },
    }
  ]
}

export default defineComponent({
  components: {
    BasicTable, SearchForm
  },
  setup() {
    const tableRef = ref<any>(null)

    const state = reactive({
      data: [],
      itemRefs: {},
      uploading: false,
      expandedRowKeys: [] as string[],
      tableLoading: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys;
        },
        selectedRowKeys: []
      },
      searchValidateForm: searchFormSchema
    })

    const addItem = ()=>{
      useCreateModal(AddModal, {
        type:'add',
        fields: {a:"222222"},
        callback: () => {
          // tableRef.value.refreshTableData()
        }
      })
    }
    const deleteItems = ()=>{
      // console.log(state.rowSelection.selectedRowKeys.toString())
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await deleteUsers({userIds: state.rowSelection.selectedRowKeys.toString()})
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }

    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    // 点击展开图标
    const expand = async (expanded, record) => {
      console.log(expanded, record)
      // 如果是第一次展开
      if (expanded && record.menuLevel == 1) {
      //   const iconEle = state.itemRefs[record.menuId].parentElement.querySelector('.ant-table-row-expand-icon')
      //  console.log(iconEle)
      //  render(createVNode(LoadingOutlined), iconEle)
      //   await nextTick()
        // iconEle.classList.add('loading-icon')
        const {result} = await queryMenuList({menuId: record.menuId, menuType: 'menu'})
        record.children = result.records
        // render(null, iconEle)
        // await nextTick()
        // iconEle.classList.remove('loading-icon')
      }
    }

    // onMounted(()=>{
    //   expand()
    // })

    const handleSearch = (val) => {
      tableRef.value.refreshTableData(val)
    }

    return {
      ...toRefs(state),
      tableRef,
      columns,
      getDictionaryList,
      isDisabled,
      addItem,
      deleteItems,
      expand,
      handleSearch
    }
  }
})
</script>

<style lang="scss">
.loading-icon {
  border: none;
  &.ant-table-row-expanded::after {
    content: none;
  }
}
</style>
