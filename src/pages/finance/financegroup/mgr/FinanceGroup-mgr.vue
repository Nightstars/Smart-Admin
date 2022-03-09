<template>
  <a-spin :spinning="spinning" size="large" tip="Loading...">
    <a-card>
      <div>
        <a-form layout="horizontal">
          <div>
            <a-row >
              <a-col :md="8" :sm="24" >
                <a-form-item
                    :label="$t('groupName')"
                    :labelCol="{span: 7}"
                    :wrapperCol="{span: 16, offset: 1}"
                >
                  <a-input v-model="groupName" :placeholder="$t('please_input')" />
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
          <div slot="groupName" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="groupWeight" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="groupDescription" slot-scope="{text}">
            {{text}}
          </div>

          <div slot="action" slot-scope="{text, record}">
            <router-link :to="`finance-group-details/${record.seqNo}`" style="margin-right: 8px;">{{ $t('details') }}</router-link>
            <router-link :to="`finance-group-edit/${record.seqNo}`" style="margin-right: 8px;"><a-icon type="edit"/>
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
import { financeGroupService } from '@/services/'

const columns = [
  {
    title: "名称",
    dataIndex: 'groupName',
    ellipsis: true,
    scopedSlots: { customRender: 'groupName' }
  },
  {
    title: '权重',
    dataIndex: 'groupWeight',
    ellipsis: true,
    scopedSlots: { customRender: 'groupWeight' }
  },
  {
    title: '描述',
    dataIndex: 'groupDescription',
    ellipsis: true,
    scopedSlots: { customRender: 'groupDescription' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  }
]

export default {
  name: 'FinanceGroup-mgr',
  i18n: require('./i18n'),
  components: {StandardTable},
  data () {
    return {
      groupName: '',
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
      await financeGroupService.getAll(`sid=1&groupName=${this.groupName}`).then(res=>this.requestAfter(res))
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
      this.$router.push({ path: 'finance-apps-add' })
    },

    async confirm(seqNo) {
      await financeGroupService.remove(seqNo).then(res=>this.remove(res))
    },

    reset () {
      this.groupName=''
    }

  }
}
</script>

<style lang="less" scoped>
@import "src/pages/finance/financegroup/mgr/index";
</style>
