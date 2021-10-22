<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
      <a-spin :spinning="spinning" size="large" tip="Loading...">
        <a-form-model ref="appForm" :model="appForm" :rules="rules" v-bind="layout" >

          <a-form-model-item has-feedback prop="name" :label="$t('name')">
            <a-input v-model="appForm.name" :placeholder="$t('nameInput')" autocomplete="off" :maxLength="num255"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="url" :label="$t('url')">
            <a-input v-model="appForm.url" :placeholder="$t('urlInput')" autocomplete="off" :maxLength="num512"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="icon" :label="$t('icon')">
            <a-input v-model="appForm.icon" :placeholder="$t('iconInput')" autocomplete="off" :maxLength="num512"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="tag" :label="$t('tag')">
            <a-input v-model="appForm.tag" :placeholder="$t('tagInput')" autocomplete="off" :maxLength="num255"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="weight" :label="$t('weight')">
            <a-input v-model="appForm.weight" :placeholder="$t('weightInput')" autocomplete="off" :maxLength="num255"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="summary" :label="$t('summary')">
            <a-textarea rows="4" :placeholder="$t('summaryInput')" v-model="appForm.summary" :maxLength="num512"/>
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
import {edit, get} from '@/services/app'

export default {
  name: 'MyappsEdit',
  i18n: require('./i18n'),
  data() {

    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`${this.$t('validateName')}`));
      }else{
        callback()
      }
    };

    let validateUrl = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`${this.$t('validateUrl')}`));
      }else{
        callback()
      }
    };

    let validateIcon = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`${this.$t('validateIcon')}`));
      }else{
        callback()
      }
    };

    let validateNoRequire = (rule, value, callback) => {
        callback()
    };

    return {
      appForm: {
        name: '',
        url: '',
        icon: '',
        summary: '',
        tag: '',
        weight: ''
      },
      rules: {
        name: [{ validator: validateName, trigger: 'change' }],
        url: [{ validator: validateUrl, trigger: 'change' }],
        icon: [{ validator: validateIcon, trigger: 'change' }],
        tag: [{ validator: validateNoRequire, trigger: 'change' }],
        weight: [{ validator: validateNoRequire, trigger: 'change' }],
        summary: [{ validator: validateNoRequire, trigger: 'change' }]
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
    await get(this.$route.params.seqNo).then(res=>this.init(res))
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
        await edit(this.appForm).then(res=>this.requestAfter(res))
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
@import "src/pages/myapps/index";
</style>
