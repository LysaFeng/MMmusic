import * as types from './mutation-types.js'

// synchronous process
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
