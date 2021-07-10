<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-spin :spinning="spinning" size="large" tip="Loading..." style="margin-top: 150px;">
    </a-spin>
    <a-row :gutter="[16, { xs: 8, sm: 16, md: 24, lg: 32 }]">

      <a-col
          class="gutter-row"
          :span="6" :xs="8" :sm="6" :md="6" :lg="6" :xl="3"
          v-for="(item, idx) in apps"
          :key="idx"
      >
        <a :href="item.url" target="_blank">
          <div class="app-container">
            <div class="app">
              <a-avatar
                  :size="80"
                  :src="item.icon"
                  alt="S"
                  class="margin-top-sm"
              />
            </div>
            <a-tag color="#2db7f5" class="margin-top">
              {{ item.name }}
            </a-tag>
          </div>
        </a>
      </a-col>

    </a-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getAll} from '@/services/app'

  export default {
    name: 'Myapps',
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
       await this.getData()
    },

    methods: {
      async getData () {
          this.spinning = !this.spinning
          await getAll(`pageIndex=1&pageSize=50&name=`).then(res=>this.requestAfter(res))
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
@import "index";
</style>
