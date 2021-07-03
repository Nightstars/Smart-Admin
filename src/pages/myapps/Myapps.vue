<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
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
  export default {
    name: 'Myapps',
    i18n: require('./i18n'),
    data() {
      return {
        apps: [
          {
            "id": 28,
            "name": "Bing",
            "url": "https://cn.bing.com/",
            "icon": "https://tse4-mm.cn.bing.net/th/id/OIP.s73DQ1unh_fCikRPyJp1ewHaHa?pid=ImgDet&rs=1",
            "summary": "bing"
          },
          {
            "id": 29,
            "name": "齐鲁正式",
            "url": "https://ibmp.qilu-pharma.com/QLAccount/Login?ReturnUrl=%2F",
            "icon": "https://th.bing.com/th/id/R72594deb697cd9a41779a3f88027356c?rik=qim5OQaRsHZ7gQ&riu=http%3a%2f%2fpic1.jobui.com%2fcompanyLogo%2f715107%2f14443761466016.png!msq&ehk=vs0xNKcE2uLM5iNreNQP3EN0DcQCkqm7yCBUZVT0CNo%3d&risl=&pid=ImgRaw",
            "summary": "齐鲁正式"
          },
          {
            "id": 30,
            "name": "文本差异",
            "url": "https://www.jq22.com/textDifference",
            "icon": "https://th.bing.com/th/id/Rd5e64050e3288fd090f448ff11e915ce?rik=vqxmbvG4SvwBRg&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fq_70%2cc_zoom%2cw_640%2fimages%2f20180715%2f73298b5cdd7e4aa0acce51b776f49733.jpeg&ehk=OewDu21Ba2G%2fbfz48Wt8nQvm8jcby%2bD5Fd1nLtdaVQU%3d&risl=&pid=ImgRaw",
            "summary": "文本差异"
          },
          {
            "id": 31,
            "name": "mycloud",
            "url": "http://cloudapps.life:8889/",
            "icon": "https://cdn4.iconfinder.com/data/icons/flat-rounded-seo-icons/80/cloud-storage-512.png",
            "summary": "mycloud"
          },
          {
            "id": 32,
            "name": "element-plus",
            "url": "https://element-plus.org/#/zh-CN/component/installation",
            "icon": "https://main.qcloudimg.com/raw/c1e4f4dbc9f8d54cbbdb94da8a38d6f9.svg",
            "summary": "element-plus"
          },
          {
            "id": 34,
            "name": "myblog",
            "url": "http://cloudapps.life:9999",
            "icon": "https://tse3-mm.cn.bing.net/th/id/OIP.FAqzoP4CfK8PcE_y9ev-PAHaHa?pid=ImgDet&rs=1",
            "summary": "myblog"
          },
          {
            "id": 35,
            "name": "openwrt",
            "url": "http://cloudapps.life:8088",
            "icon": "https://tse4-mm.cn.bing.net/th/id/OIP.fO2LyPO2pQgYGGsfcygh2wAAAA?pid=ImgDet&rs=1",
            "summary": "openwrt"
          },
          {
            "id": 36,
            "name": "daily task",
            "url": "https://kdocs.cn/l/ci12PKtsVGM2",
            "icon": "https://cdn.dribbble.com/users/111709/screenshots/2032133/task-younique.jpg",
            "summary": "daily task"
          },
          {
            "id": 37,
            "name": "project Issue",
            "url": "http://projectissue.longnows.cn",
            "icon": "https://src.onlinedown.net/supply/sup_logo/logo-1128/306996_g.jpg",
            "summary": "project Issue"
          },
          {
            "id": 38,
            "name": "nas",
            "url": "http://nas.longnows.cn/",
            "icon": "https://th.bing.com/th/id/R517ae4863a885a7fffba62f99142bc0e?rik=eceMbliTcPfJpw&riu=http%3a%2f%2fwww.servispckupka.cz%2fobrazky%2fjak_zalohovat_systemovy_disk%2fjak_zalohovat_systemovy_disk_bitova_kopie_operacniho_systemu_logo.png&ehk=9ZQyG4TGgAy00QttmdrYwxRp1joQEtlumw%2fqKLHkWPQ%3d&risl=&pid=ImgRaw",
            "summary": "nas"
          },
          {
            "id": 40,
            "name": "正泰股份",
            "url": "http://localhost:5003/?menuid=ZT00001",
            "icon": "https://p1.ssl.qhmsg.com/dr/270_500_/t01aa5f3178812ddda2.jpg",
            "summary": "正泰股份"
          },
          {
            "id": 41,
            "name": "git",
            "url": "http://git.longnows.cn",
            "icon": "https://tse2-mm.cn.bing.net/th/id/OIP.U0W2_0CeAJChacOneQUmpQHaG1?pid=ImgDet&rs=1",
            "summary": "git"
          },
          {
            "id": 42,
            "name": "齐鲁堡垒机",
            "url": "https://10.12.19.113/",
            "icon": "https://th.bing.com/th/id/Ra9a91877a0234392e8c21bc6e812ceaf?rik=DULtJ5OAn%2bDynw&riu=http%3a%2f%2fpic147.nipic.com%2ffile%2f20171127%2f2348748_160329893000_2.jpg&ehk=uyBLYftotQMp8%2bXc04q7R0CLiZOxMuMvsUH0tlxUFGk%3d&risl=&pid=ImgRaw",
            "summary": "齐鲁堡垒机"
          },
          {
            "id": 43,
            "name": "地理中国",
            "url": "https://tv.cctv.com/lm/dlzg/index.shtml?spm=C28340.PlFTqGe6Zk8M.S70924.28",
            "icon": "https://th.bing.com/th/id/Rf1ac9738dfc94a443a661df8304e23e3?rik=62LMoyDj1CJ%2fMg&riu=http%3a%2f%2fbpic.588ku.com%2felement_origin_min_pic%2f16%2f07%2f01%2f205776643f58466.jpg&ehk=T4%2by8xNXvoGeMU0s1f5Vt60yzJXMpG3pvBHfBpLJbDQ%3d&risl=&pid=ImgRaw",
            "summary": "地理中国"
          },
          {
            "id": 44,
            "name": "wallpaperscraft",
            "url": "https://wallpaperscraft.com",
            "icon": "https://botw-pd.s3.amazonaws.com/bg_logo_only_v2.png",
            "summary": "wallpaperscraft"
          },
          {
            "id": 45,
            "name": "bilibili",
            "url": "https://www.bilibili.com/",
            "icon": "https://tse4-mm.cn.bing.net/th/id/OIP.whN6q9A4nd386EgU8yVOuAHaHa?pid=ImgDet&rs=1",
            "summary": "bilibili"
          },
          {
            "id": 46,
            "name": "在线之家",
            "url": "https://www.zxzj.me/",
            "icon": "https://th.bing.com/th/id/R549ae7036f520a78710b36b78caf0a20?rik=3%2foS3hyNW6WlpA&riu=http%3a%2f%2fpic241.nipic.com%2ffile%2f20190920%2f27837611_141108245088_2.jpg&ehk=C77cjICCzS1lpubEYntmWVoJEE5uHb9FrTkHzss345s%3d&risl=&pid=ImgRaw",
            "summary": "在线之家"
          },
          {
            "id": 47,
            "name": "git docs",
            "url": "https://backlog.com/git-tutorial/cn/",
            "icon": "https://tse2-mm.cn.bing.net/th/id/OIP.VXo_3Ptknmuw6XIxzPMK8gAAAA?pid=ImgDet&rs=1",
            "summary": "git note"
          },
          {
            "id": 48,
            "name": "V6",
            "url": "https://v6.51aeo.com",
            "icon": "https://tse1-mm.cn.bing.net/th/id/OIP.PKsO1Kzq7ArSxK5o9JRKCwAAAA?pid=ImgDet&rs=1",
            "summary": "V6"
          },
          {
            "id": 49,
            "name": "本地调试",
            "url": "http://127.0.0.1:5003",
            "icon": "https://tse1-mm.cn.bing.net/th/id/OIP.9QlOcopNNVNLCS_qOJ8HYAHaHa?pid=ImgDet&rs=1",
            "summary": "本地调试"
          },
          {
            "id": 50,
            "name": "frp",
            "url": "http://cloudapps.life:7500/",
            "icon": "https://th.bing.com/th/id/R0649d1d840f1c9b61189adb871a70a7b?rik=254S821MgdFv4w&riu=http%3a%2f%2fimg.qjsmartech.com%2fCrawler%2fImages%2f2018-05%2f2018051109210708241.png&ehk=ej5sbBthDbE0Ro7yG3THGlc%2fYtheQWFNVO9hjecGB8M%3d&risl=&pid=ImgRaw",
            "summary": "frp"
          },
          {
            "id": 51,
            "name": "Github",
            "url": "https://github.com/Nightstars",
            "icon": "https://tse3-mm.cn.bing.net/th/id/OIP.S3Hk8PWzC7-amaeXPIOOugHaHa?pid=ImgDet&rs=1",
            "summary": "Github"
          },
          {
            "id": 52,
            "name": "identtityServer4",
            "url": "https://identityserver4.readthedocs.io/en/latest/",
            "icon": "https://tse2-mm.cn.bing.net/th/id/OIP.e6ZU5-gtM_f2JT6IgswlcwHaHa?pid=ImgDet&rs=1",
            "summary": "identtity server4 docs"
          },
          {
            "id": 53,
            "name": "oauth2 docs",
            "url": "https://oauth.net/2/",
            "icon": "https://oauth.net/images/oauth-2-sm.png",
            "summary": "oauth2 docs"
          },
          {
            "id": 54,
            "name": "CSDN",
            "url": "https://csdn.net",
            "icon": "https://static.vecteezy.com/system/resources/previews/000/206/765/original/letter-c-typography-illustration-vector.jpg",
            "summary": "CSDN"
          },
          {
            "id": 55,
            "name": "SoJson",
            "url": "https://www.sojson.com/",
            "icon": "https://tse1-mm.cn.bing.net/th/id/OIP.0cdNRsqKHZLEjClFgurAYAAAAA?pid=ImgDet&rs=1",
            "summary": "SoJson"
          },
          {
            "id": 56,
            "name": "DailyTask",
            "url": "https://www.kdocs.cn/l/cvhcnaNbvStx",
            "icon": "https://tse4-mm.cn.bing.net/th/id/OIP.Lv5omqp-YurVCVk-BjcRXgHaDt?w=314&h=174&c=7&o=5&pid=1.7",
            "summary": "DailyTask"
          },
          {
            "id": 57,
            "name": "filerun",
            "url": "http://cloudapps.life:8882/",
            "icon": "https://www.sikich.com/wp-content/uploads/2018/04/cloudfileserverthumb.jpg",
            "summary": "filerun"
          },
          {
            "id": 59,
            "name": "vue-antd-admin",
            "url": "https://iczer.gitee.io/vue-antd-admin-docs/",
            "icon": "https://iczer.gitee.io/vue-antd-admin-docs/logo.png",
            "summary": "vue-antd-admin"
          },
          {
            "id": 60,
            "name": "星空影视",
            "url": "http://www.mycctv.cn/",
            "icon": "https://tse2-mm.cn.bing.net/th/id/OIP-C.nGclJgN2lNMLcBSA8QoonwAAAA?pid=ImgDet&rs=1",
            "summary": "星空影视"
          },
          {
            "id": 61,
            "name": "Ant Design Vue",
            "url": "https://www.antdv.com/docs/vue/introduce-cn/",
            "icon": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
            "summary": "Ant Design of Vue"
          }
        ],
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      desc() {
        return this.$t('description')
      }
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>