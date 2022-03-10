<template>
  <div>
    <a-card :body-style="{padding: '1px 1px'}" :bordered="false" >
      <a-spin :spinning="spinning" size="large" tip="Loading...">
        <div style=";position: absolute;z-index: 999;margin: 20px;">
<!--          <a-icon type="rollback" style="font-size: 30px;color: white"></a-icon><span style="font-size: 25px;">返回</span>-->
          <a-button type="primary" @click="back"> <a-icon type="left"/>返回 </a-button>
        </div>
        <div>
        <iframe
            :src="frameSrc"
            class="main"
            ref="frameRef"
            frameborder="0"
            scrolling="auto"
        ></iframe>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'FinanceAppDetails',
  i18n: require('./i18n'),
  data() {

    return {
      frameSrc: '',
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      showLoading: false,
      spinning: true
    };
  },

  async created () {
    //this.frameSrc = this.$route.params.url
    this.frameSrc = "https://bing.com"
    this.spinning=false
  },

  computed: {
    ...mapState('setting', ['pageMinHeight']),
    // desc() {
    //   return this.$t('pageDesc')
    // }
  },

  methods: {
    back(){
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
