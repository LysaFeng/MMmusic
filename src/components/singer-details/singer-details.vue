<template>
  <div class="music-list">歌手详情</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    // getters map to computed
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log(this.singer)
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
