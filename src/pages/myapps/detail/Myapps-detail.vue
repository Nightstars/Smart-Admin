<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
      <a-spin :spinning="spinning" size="large" tip="Loading...">
        <a-form-model ref="appForm" :model="appForm" v-bind="layout">

          <a-form-model-item has-feedback prop="name" :label="$t('name')">
            <a-input v-model="appForm.name" :placeholder="$t('nameInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="url" :label="$t('url')">
            <a-input v-model="appForm.url" :placeholder="$t('urlInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="icon" :label="$t('icon')">
            <a-input v-model="appForm.icon" :placeholder="$t('iconInput')" autocomplete="off" disabled/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="summary" :label="$t('summary')">
            <a-textarea rows="4" :placeholder="$t('summaryInput')" disabled v-model="appForm.summary"/>
          </a-form-model-item>

        </a-form-model>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {get} from '@/services/app'

export default {
  name: 'MyappsDetail',
  i18n: require('./i18n'),
  data() {

    return {
      appForm: {
        name: '',
        url: '',
        icon: '',
        summary: ''
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
    await get(this.$route.params.seqNo).then(res=>this.init(res))
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
@import "src/pages/myapps/index";
</style>
