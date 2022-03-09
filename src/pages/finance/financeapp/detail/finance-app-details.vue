<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
      <a-spin :spinning="spinning" size="large" tip="Loading...">
        <a-form-model ref="appForm" :model="appForm" v-bind="layout">

          <a-form-model-item has-feedback prop="appName" :label="$t('appName')">
            <a-input v-model="appForm.appName" :placeholder="$t('appNameInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appPath" :label="$t('appPath')">
            <a-input v-model="appForm.appPath" :placeholder="$t('appPathInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appGroup" :label="$t('appGroup')">
            <a-input v-model="appForm.appGroup" :placeholder="$t('appGroupInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appWeight" :label="$t('appWeight')">
            <a-input v-model="appForm.appWeight" :placeholder="$t('appWeightInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appDescription" :label="$t('appDescription')">
            <a-textarea rows="4" :placeholder="$t('appDescriptionInput')" v-model="appForm.appDescription" disabled/>
          </a-form-model-item>

        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import { financeAppService } from '@/services/'

export default {
  name: 'FinanceAppDetails',
  i18n: require('./i18n'),
  data() {

    return {
      appForm: {
        appName: '',
        appPath: '',
        appGroup: '',
        appWeight: '',
        appDescription: '',
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
    await financeAppService.get(this.$route.params.seqNo).then(res=>this.init(res))
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
