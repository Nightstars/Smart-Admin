<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-spin :spinning="spinning" size="large" tip="Loading..." style="margin-top: 150px;">
    </a-spin>
    <div
        v-for="(item, index) in apps"
        :key="index"
    >
      <a-row style="margin-top: 30px;padding-left: 20px">

        <a-col
            class="gutter-row"
            :span="6" :xs="12" :sm="8" :md="8" :lg="6" :xl="4"
        >
          <h3 style="text-align: left;padding-left: 10px;font-weight: bold;color: #Ff9700">{{item.groupName}}</h3>
        </a-col>
      </a-row>

      <a-row :gutter="[16,30]">

        <a-col
            class="gutter-row"
            :span="6" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" :xxl="4"
            v-for="(app, cindex) in apps[index].financesApps"
            :key="cindex"
        >
          <a :href="app.appPath" target="_blank">
            <div class="app-container">
              <div class="app">
                <!--              <a-avatar-->
                <!--                  :size="80"-->
                <!--                  :src="item.icon"-->
                <!--                  alt="S"-->
                <!--                  class="margin-top-sm"-->
                <!--              />-->
                <p style="text-align: center;color: #ffffff;font-size: 36px;padding-top: 16px">{{ app.appName }}</p>
              </div>
              <!--            <a-tag color="#2db7f5" class="margin-top">-->
              <!--              {{ item.name }}-->
              <!--            </a-tag>-->
            </div>
          </a>
        </a-col>

      </a-row>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {financeAppService} from '@/services/'

  export default {
    name: 'Finance_Apps',
    i18n: require('./i18n'),
    data() {
      return {
        apps: [],
        spinning: false,
        indicator: <a-icon type="loading" style="font-size: 160px" spin />,
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      // desc() {
      //   return this.$t('description')
      // }
    },

    async created() {
       await this.Init()
    },

    methods: {
      async Init () {
          this.spinning = !this.spinning
          await financeAppService.getData(`Sid=1&appName=&groupName=`).then(res=>this.requestAfter(res))
      },

      requestAfter (res) {
        let data=res.data
        if (data.success) {
          console.log(data.data)
          this.apps=data.data
        } else {
          this.error = data.msg
        }
        this.spinning = !this.spinning
      }
    }

  }
</script>

<style scoped lang="less">
@import "./index";
</style>
