import {useCreateModal} from "/@/hooks"
import EditModal from './edit-modal.vue'
import {deleteUser} from "/@/api/system"
import {TableColumn} from "/@/types/tableColumn"

export const columns: TableColumn[] = [ 
    {
        title: '操作类型',
        dataIndex: 'logType',
    },
    {
        title: '操作日志',
        dataIndex: 'logName',
    },
    {
        title: '系统模块',
        dataIndex: 'className',
        ellipsis: true,
    },
    {
        title: '主机',
        dataIndex: 'ipAddress',
    },
    {
        title: '操作状态',
        dataIndex: 'succeed',
    },
    {
        title: '操作人',
        dataIndex: 'userAccount',
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
