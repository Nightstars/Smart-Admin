<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
      <a-spin :spinning="spinning" size="large" tip="Loading...">
        <a-form-model ref="appForm" :model="appForm" v-bind="layout">

          <a-form-model-item has-feedback prop="groupName" :label="$t('groupName')">
            <a-input v-model="appForm.groupName" :placeholder="$t('groupNameInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="groupWeight" :label="$t('groupWeight')">
            <a-input v-model="appForm.groupWeight" :placeholder="$t('weightInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="groupDescription" :label="$t('groupDescription')">
            <a-textarea rows="4" :placeholder="$t('groupDescriptionInput')" v-model="appForm.groupDescription" disabled/>
          </a-form-model-item>

        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import { financeGroupService } from '@/services/'

export default {
  name: 'FinanceGroupDetails',
  i18n: require('./i18n'),
  data() {

    return {
      appForm: {
        groupName: '',
        groupDescription: '',
        groupWeight: ''
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      validated: false,
      showLoading: false,
      spinning: true
    };
  },

  async created () {
    await financeGroupService.get(this.$route.params.seqNo).then(res=>this.init(res))
    this.spinning=false
  },

  computed: {
    ...mapState('setting', ['pageMinHeight']),
    // desc() {
    //   return this.$t('pageDesc')
    // }
  },

  methods: {

    init (res) {
      if (res.data.success) {
        this.appForm=res.data.data
      } else {
        this.error = res.data.msg
      }
    },

  },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
