<!--<template>-->
<!--  <div>-->
<!--    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >-->
<!--      <a-form :model="form1" @submit="onSubmit">-->

<!--        <a-form-item-->
<!--            :label="$t('name')"-->
<!--            :labelCol="{span: 7}"-->
<!--            :wrapperCol="{span: 10}"-->
<!--        >-->
<!--          <a-input :placeholder="$t('nameInput')"-->
<!--                   v-decorator="['Name', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"-->
<!--                   v-model="form1.name"-->
<!--          />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--            :label="$t('url')"-->
<!--            :labelCol="{span: 7}"-->
<!--            :wrapperCol="{span: 10}"-->
<!--        >-->
<!--          <a-input :placeholder="$t('urlInput')"-->
<!--                   v-model="form1.url"-->
<!--          />-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--            :label="$t('icon')"-->
<!--            :labelCol="{span: 7}"-->
<!--            :wrapperCol="{span: 10}"-->
<!--        >-->
<!--          <a-input :placeholder="$t('iconInput')"-->
<!--                   v-model="form1.icon"/>-->
<!--        </a-form-item>-->

<!--        <a-form-item-->
<!--            :label="$t('summary')"-->
<!--            :labelCol="{span: 7}"-->
<!--            :wrapperCol="{span: 10}"-->
<!--        >-->
<!--          <a-textarea rows="4" :placeholder="$t('summaryInput')"-->
<!--                      v-model="form1.summary"-->
<!--          />-->
<!--        </a-form-item>-->

<!--        <a-form-item style="margin-top: 24px;text-align: center" :wrapperCol="{span: 10, offset: 7}">-->
<!--          <a-button type="primary" style="width: 120px;" htmlType="submit">{{$t('submit')}}</a-button>-->
<!--          <a-button style="margin-left: 8px" @click="reset">{{$t('reset')}}</a-button>-->
<!--        </a-form-item>-->
<!--      </a-form>-->
<!--    </a-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapState} from 'vuex'-->
<!--import {add} from '@/services/app'-->

<!--export default {-->
<!--  name: 'MyappsAdd',-->
<!--  i18n: require('./i18n'),-->
<!--  data() {-->
<!--    return {-->
<!--      apps: [],-->
<!--      spinning: false,-->
<!--      form: this.$form.createForm(this)-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState('setting', ['pageMinHeight']),-->
<!--    desc() {-->
<!--      return this.$t('pageDesc')-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    async onSubmit() {-->
<!--      this.form.validateFields(err => {-->
<!--        if (!err) {-->
<!--          this.validated=true-->
<!--        }-->
<!--      });-->
<!--      this.spinning = !this.spinning-->
<!--      await add(this.form).then(res=>this.requestAfter(res))-->
<!--    },-->
<!--    requestAfter (res) {-->
<!--      let data=res.data-->
<!--      if (data.success) {-->
<!--        console.log(data)-->
<!--        this.$message.success(data.msg, 2)-->
<!--      } else {-->
<!--        this.error = data.msg-->
<!--      }-->
<!--      this.spinning = !this.spinning-->
<!--    },-->
<!--    reset () {-->
<!--      this.form={-->
<!--        name: '',-->
<!--        url: '',-->
<!--        icon: '',-->
<!--        summary: ''-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--}-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--@import "src/pages/myapps/index";-->
<!--</style>-->



<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
      <a-form-model ref="appForm" :model="appForm" :rules="rules" v-bind="layout">

        <a-form-model-item has-feedback prop="name" :label="$t('name')">
          <a-input v-model="appForm.name" :placeholder="$t('nameInput')" autocomplete="off" />
        </a-form-model-item>

        <a-form-model-item has-feedback prop="url" :label="$t('url')">
          <a-input v-model="appForm.url" :placeholder="$t('urlInput')" autocomplete="off" />
        </a-form-model-item>

        <a-form-model-item has-feedback prop="icon" :label="$t('icon')">
          <a-input v-model="appForm.icon" :placeholder="$t('iconInput')" autocomplete="off" />
        </a-form-model-item>

        <a-form-model-item has-feedback prop="summary" :label="$t('summary')">
          <a-textarea rows="4" :placeholder="$t('summaryInput')" />
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
    </a-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {add} from '@/services/app'

export default {
  name: 'MyappsAdd',
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

    return {
      appForm: {
        name: '',
        url: '',
        icon: '',
        summary: ''
      },
      rules: {
        name: [{ validator: validateName, trigger: 'change' }],
        url: [{ validator: validateUrl, trigger: 'change' }],
        icon: [{ validator: validateIcon, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      validated: false,
      showLoading: false,
    };
  },

  computed: {
    ...mapState('setting', ['pageMinHeight']),
    desc() {
      return this.$t('pageDesc')
    }
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
        await add(this.appForm).then(res=>this.requestAfter(res))
      }
    },

    requestAfter (res) {
      let data=res.data
      if (data.success) {
        this.$message.success(data.msg, 2)
        this.resetForm('appForm')
      } else {
        this.error = data.msg
      }
      this.showLoading=false
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