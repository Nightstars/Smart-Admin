<template>
  <a-spin :spinning="spinning" size="large" tip="Loading...">
    <a-card>
      <div>
        <a-form layout="horizontal">
          <div>
            <a-row >
              <a-col :md="8" :sm="24" >
                <a-form-item
                    :label="$t('appName')"
                    :labelCol="{span: 7}"
                    :wrapperCol="{span: 16, offset: 1}"
                >
                  <a-input v-model="appName" :placeholder="$t('please_input')" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div style="text-align: center;margin: 0 auto 25px;">
            <a-button type="primary" @click="getData()">{{ $t('query') }}</a-button>
            <a-button style="margin-left: 8px" @click="reset()">{{ $t('reset') }}</a-button>
          </div>
        </a-form>
      </div>
      <div>
        <a-space class="operator">
          <a-button @click="addNew" type="primary">{{ $t('create') }}</a-button>
        </a-space>
        <standard-table
            :columns="columns"
            :dataSource="dataSource"
            :selectedRows.sync="selectedRows"
        >
          <div slot="appName" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="appPath" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="appGroup" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="appWeight" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="appDescription" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="action" slot-scope="{text, record}">
            <router-link :to="`finance-app-details/${record.seqNo}`" style="margin-right: 8px;">{{ $t('details') }}</router-link>
            <router-link :to="`finance-app-edit/${record.seqNo}`" style="margin-right: 8px;"><a-icon type="edit"/>
              {{ $t('edit') }}</router-link>
            <a-popconfirm
                :title="$t('question')"
                :ok-text="$t('confirm')"
                :cancel-text="$t('cancel')"
                @confirm="confirm(record.seqNo)"
            >
              <a>
                <a-icon type="delete" />
                {{ $t('delete') }}
              </a>
            </a-popconfirm>
          </div>
        </standard-table>
      </div>
    </a-card>
  </a-spin>
</template>

<script>
import StandardTable from '@/components/table/StandardTable/'
import { financeAppService } from '@/services/'

//region 表格列
const columns = [
  {
    title: "名称",
    dataIndex: 'appName',
    ellipsis: true,
    scopedSlots: { customRender: 'appName' }
  },
  {
    title: "应用地址",
    dataIndex: 'appPath',
    ellipsis: true,
    scopedSlots: { customRender: 'appPath' }
  },
  {
    title: "组别",
    dataIndex: 'appGroup',
    ellipsis: true,
    scopedSlots: { customRender: 'appGroup' }
  },
  {
    title: '权重',
    dataIndex: 'appWeight',
    ellipsis: true,
    scopedSlots: { customRender: 'appWeight' }
  },
  {
    title: '描述',
    dataIndex: 'appDescription',
    ellipsis: true,
    scopedSlots: { customRender: 'appDescription' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  }
]
//endregion

export default {
  name: 'FinanceGroup-mgr',
  i18n: require('./i18n'),
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

  //region 页面初始化
  async created() {
    await this.getData()
    this.spinning=false
  },
  //endregion

  methods: {
    // region Get Data
    async getData () {
      await financeAppService.getAll(`Sid=1&AppName=${this.appName}`).then(res=>this.requestAfter(res))
    },
    //endregion

    //region requestAfter
    requestAfter (res) {
      if (res.data.success) {
        this.dataSource=res.data.data
      } else {
        this.error = res.data.msg
      }
    },
    //endregion

    //region remove
    async remove (res) {
      if(res.data.success){
        await this.getData()
        this.$message.success(res.data.msg)
      }else{
        this.error=res.data.msg
      }
    },
    //endregion

    //region 新建
    addNew () {
      this.$router.push({ path: 'finance-app-add' })
    },
    //endregion

    //region 确认删除
    async confirm(seqNo) {
      await financeAppService.remove(seqNo).then(res=>this.remove(res))
    },
    //endregion

    //region 重置查询条件
    reset () {
      this.appName=''
    }
    //endregion

  }
}
</script>

<!--region 样式-->
<style lang="less" scoped>
@import "./index";
</style>
<!--endregion-->
