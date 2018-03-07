<template>
  <div class="music-list">歌手详情</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from '../.././common/js/song.js'
  export default {
    // getters map to computed
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log('type of singer' + this.singer)
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          console.log('has singer.id')
          return
        }
        console.log('id of this singer', this.singer.id)
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log('songs of this singer', res.data.list)
            this._normalizeSong(res.data.list)
          }
        })
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach((item) => {
          console.log('single song data', item.musicData)
          if (item.musicData.songid && item.musicData.albummid) {
            ret.push(createSong(item.musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: $color-background
</style>
