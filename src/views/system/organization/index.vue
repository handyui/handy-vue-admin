<template>
  <a-card :bordered="false">
    <SearchForm ref="searchForm" :search-validate-form="searchValidateForm" @callback="handleSearch"  />
    <BasicTable ref="tableRef" :columns="columns" :get-list-func="getOrganizationList" rowKey="id" :row-selection="rowSelection">
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
import {deleteOrgList, getOrganizationList} from '/@/api/system'
import {columns} from "./columns"
import AddModal from './add-modal.vue'
import {SearchForm, FormSchema} from '/@/components/form'

export const searchFormSchema:FormSchema = {
  formItem: [
    {
        type: "input",
        label: "单位名称",
        field: "orgName",
        value: '',
        props: {
            placeholder: "请输入单位名称"
        },
    },
    {
        type: "input",
        label: "单位编码",
        field: "orgCode",
        value: '',
        props: {
            placeholder: "请输入单位编码"
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
        // fields: {a:"222222"},
        callback: () => {
          tableRef.value.refreshTableData()
        }
      })
    }
    const deleteItems = ()=>{
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await deleteOrgList({ids: state.rowSelection.selectedRowKeys.toString()})
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }

    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    const handleSearch = (val) => {
      tableRef.value.refreshTableData(val)
    }

    return {
      ...toRefs(state),
      tableRef,
      columns,
      getOrganizationList,
      isDisabled,
      addItem,
      deleteItems,
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
