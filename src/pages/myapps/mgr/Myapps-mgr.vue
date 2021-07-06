<template>
  <a-card>
    <div>
      <a-form layout="horizontal">
        <div>
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                  label="应用名称"
                  :labelCol="{span: 7}"
                  :wrapperCol="{span: 16, offset: 1}"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div style="text-align: center;margin: 0 auto 25px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
        </div>
      </a-form>
    </div>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
      </a-space>
      <standard-table
          :columns="columns"
          :dataSource="dataSource"
          :selectedRows.sync="selectedRows"
          bordered="true"
      >
        <div slot="description" slot-scope="{text}">
          {{text}}
        </div>

        <div slot="url" slot-scope="{text}">
          {{text}}
        </div>

        <div slot="icon" slot-scope="{text}">
          {{text}}
        </div>

        <div slot="summary" slot-scope="{text}">
          {{text}}
        </div>

        <div slot="action" slot-scope="{text, record}">
          <router-link :to="`/list/query/detail/${record.key}`" style="margin-right: 8px;">详情</router-link>
          <a style="margin-right: 8px;">
            <a-icon type="edit"/>编辑
          </a>
          <a-popconfirm
              title="确定删除吗?"
              ok-text="确定"
              cancel-text="我再想想"
              @confirm="confirm(record.key)"
          >
            <a>
              <a-icon type="delete" />删除
            </a>
          </a-popconfirm>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
const columns = [
  {
    title: '序号',
    dataIndex: 'no',
    ellipsis: true,
    // width: 70
  },
  {
    title: '应用名称',
    dataIndex: 'description',
    ellipsis: true,
    scopedSlots: { customRender: 'description' }
  },
  {
    title: 'Url',
    dataIndex: 'callNo',
    ellipsis: true,
    scopedSlots: { customRender: 'url' }
  },
  {
    title: 'Icon',
    dataIndex: 'status',
    needTotal: false,
    ellipsis: true,
    // slots: {title: 'statusTitle'}
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '描述',
    dataIndex: 'description',
    ellipsis: true,
    scopedSlots: { customRender: 'summary' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    ellipsis: true,
    // width: 110
  },
  {
    title: '操作',
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
  }
]

const dataSource = []

for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i,
    no: 'NO ' + i,
    description: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: '2018-07-26'
  })
}

export default {
  name: 'Myapps-mgr',
  components: {StandardTable},
  data () {
    return {
      columns: columns,
      dataSource: dataSource,
      selectedRows: []
    }
  },
  // authorize: {
  //   deleteRecord: 'delete'
  // },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },

    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },

    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: 'NO ' + this.dataSource.length,
        description: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2018-07-26'
      })
    },

    confirm(key) {
      this. deleteRecord(key)
      this.$message.success('删除成功');
    },

  }
}
</script>

<style lang="less" scoped>
.operator{
  margin-bottom: 18px;
}
</style>
