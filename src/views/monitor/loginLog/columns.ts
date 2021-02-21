import {useCreateModal} from "/@/hooks"
import EditModal from './edit-modal.vue'
import {deleteUser} from "/@/api/system"
import {TableColumn} from "/@/types/tableColumn"

export const columns: TableColumn[] = [ 
    {
        title: '登录名称',
        dataIndex: 'userName',
        // slots: {
        //     customRender: 'moduleName'
        // }
    },
    {
        title: '登录账号',
        dataIndex: 'userAccount',
    },
    {
        title: '登录地址',
        dataIndex: 'ipAddress',
    },
    {
        title: '状态',
        dataIndex: 'succeed',
    },
    {
        title: '操作时间',
        dataIndex: 'createTime',
    },
    {
        title: '操作信息',
        dataIndex: 'message',
        ellipsis: true,
    },
]
