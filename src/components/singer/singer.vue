<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import ListView from '../../base/listview/listview'
  import {mapMutations} from 'vuex'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    data() {
      return {
        singers: []
      }
    },
    components: {
      ListView
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singer) {
        console.log('singer:', singer)
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
        console.log('turn to children-route')
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(
              {
                id: item.Fsinger_id,
                name: item.Fsinger_name,
                avatar: 'http://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
              }
            )
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            avatar: 'http://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
          })
        })
        // in order to get ordered lists, need to handdle
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
