<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
      <a-spin :spinning="spinning" size="large" tip="Loading...">
        <a-form-model ref="appForm" :model="appForm" :rules="rules" v-bind="layout" >

          <a-form-model-item has-feedback prop="appName" :label="$t('appName')">
            <a-input v-model="appForm.appName" :placeholder="$t('appNameInput')" autocomplete="off" :maxLength="num255"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appPath" :label="$t('appPath')">
            <a-input v-model="appForm.appPath" :placeholder="$t('appPathInput')" autocomplete="off" :maxLength="num255"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appGroup" :label="$t('appGroup')">
            <a-input v-model="appForm.appGroup" :placeholder="$t('appGroupInput')" autocomplete="off" :maxLength="num255"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appWeight" :label="$t('appWeight')">
            <a-input v-model="appForm.appWeight" :placeholder="$t('appWeightInput')" autocomplete="off" />
          </a-form-model-item>

          <a-form-model-item has-feedback prop="appDescription" :label="$t('appDescription')">
            <a-textarea rows="4" :placeholder="$t('appDescriptionInput')" v-model="appForm.appDescription" :maxLength="num512"/>
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="text-align: center">
            <a-button type="primary"
                      @click="submitForm('appForm')"
                      :loading="showLoading"
                      :readnoly="showLoading"
            >{{$t('submit')}}</a-button>
            <a-button style="margin-left: 10px"
                      @click="resetForm('appForm')"
                      :disabled="showLoading"
            >{{$t('reset')}}</a-button>
          </a-form-model-item>

        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {financeAppService} from '@/services/'

export default {
  name: 'FinanceAppEdit',
  i18n: require('./i18n'),
  data() {

    let validateAppName = (rule, value, callback) => {
      if ((value ?? '') === '') {
        callback(new Error(`${this.$t('validateAppName')}`));
      }else{
        callback()
      }
    };

    let validateAppPath = (rule, value, callback) => {
      if ((value ?? '') === '') {
        callback(new Error(`${this.$t('validateAppPath')}`));
      }else{
        callback()
      }
    };

    let validateAppGroup = (rule, value, callback) => {
      if ((value ?? '') === '') {
        callback(new Error(`${this.$t('validateAppGroup')}`));
      }else{
        callback()
      }
    };

    let validateNoRequire = (rule, value, callback) => {
      callback()
    };

    return {
      appForm: {
        appName: '',
        appPath: '',
        appGroup: '',
        appWeight: '',
        appDescription: '',
      },
      rules: {
        appName: [{ validator: validateAppName, trigger: 'change' }],
        appPath: [{ validator: validateAppPath, trigger: 'change' }],
        appGroup: [{ validator: validateAppGroup, trigger: 'change' }],
        appWeight: [{ validator: validateNoRequire, trigger: 'change' }],
        appDescription: [{ validator: validateNoRequire, trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      validated: false,
      showLoading: false,
      num255: 255,
      num512: 512,
      spinning: true
    };
  },

  async created () {
    await financeAppService.get(this.$route.params.seqNo).then(res=>this.init(res))
    this.spinning=false;
  },

  computed: {
    ...mapState('setting', ['pageMinHeight']),
    // desc() {
    //   return this.$t('pageDesc')
    // }
  },

  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.validated=true
        } else {
          this.validated=false
          return false;
        }
      });

      if (this.validated) {
        this.showLoading=true;
        await financeAppService.edit(this.appForm).then(res=>this.requestAfter(res))
      }
    },

    requestAfter (res) {
      let data=res.data
      if (data.success) {
        this.$message.success(data.msg, 2)
      } else {
        this.error = data.msg
      }
      this.showLoading=false
    },

    init (res) {
      if (res.data.success) {
        this.appForm=res.data.data
      } else {
        this.error = res.data.msg
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
