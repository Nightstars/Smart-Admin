<template>
  <a-spin :spinning="spinning" size="large" tip="Loading...">
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
                  <a-input v-model="appName" placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div style="text-align: center;margin: 0 auto 25px;">
            <a-button type="primary" @click="getData()">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset()">重置</a-button>
          </div>
        </a-form>
      </div>
      <div>
        <a-space class="operator">
          <a-button @click="addNew" type="primary" hidden>新建</a-button>
        </a-space>
        <standard-table
            :columns="columns"
            :dataSource="dataSource"
            :selectedRows.sync="selectedRows"
        >
          <div slot="name" slot-scope="{text}">
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
            <router-link :to="`/myapps/apps-detail/${record.seqNo}`" style="margin-right: 8px;">详情</router-link>
            <router-link :to="`/myapps/apps-edit/${record.seqNo}`" style="margin-right: 8px;"><a-icon type="edit"/>编辑</router-link>
            <a-popconfirm
                title="确定删除吗?"
                ok-text="确定"
                cancel-text="我再想想"
                @confirm="confirm(record.seqNo)"
            >
              <a>
                <a-icon type="delete" />删除
              </a>
            </a-popconfirm>
          </div>
        </standard-table>
      </div>
    </a-card>
  </a-spin>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {getAll,remove} from '@/services/app'

const columns = [
  {
    title: '应用名称',
    dataIndex: 'name',
    ellipsis: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Url',
    dataIndex: 'url',
    ellipsis: true,
    scopedSlots: { customRender: 'url' }
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    needTotal: false,
    ellipsis: true,
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '描述',
    dataIndex: 'summary',
    ellipsis: true,
    scopedSlots: { customRender: 'summary' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  }
]

export default {
  name: 'Myapps-mgr',
  components: {StandardTable},
  data () {
    return {
      appName: '',
      columns: columns,
      dataSource: [],
      selectedRows: [],
      spinning: true
    }
  },
  // authorize: {
  //   deleteRecord: 'delete'
  // },

  async created() {
    await this.getData()
    this.spinning=false
  },

  methods: {
    async getData () {
      await getAll(`pageIndex=1&pageSize=1000&name=${this.appName}`).then(res=>this.requestAfter(res))
    },

    requestAfter (res) {
      if (res.data.success) {
        this.dataSource=res.data.data
      } else {
        this.error = res.data.msg
      }
    },

    async remove (res) {
      if(res.data.success){
        await this.getData()
        this.$message.success(res.data.msg)
      }else{
        this.error=res.data.msg
      }
    },

    addNew () {
      console.log("add")
    },

    async confirm(seqNo) {
      await remove(seqNo).then(res=>this.remove(res))
    },

    reset () {
      this.appName=''
    }

  }
}
</script>

<style lang="less" scoped>
.operator{
  margin-bottom: 18px;
}
</style>
