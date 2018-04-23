/* globals Store */
// import api from './backend-api'

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    let data = 'username=' + email + '&password=' + pass
  },
  getToken () {
    return Store.state.user.token
  },
  logout (cb) {
    // delete localStorage.token Store.commit('setToken', null)
    // Store.dispatch('user/logout')
    if (cb) {
      cb(null)
    }
    this.onChange(false)
  },
  loggedIn () {
    return !!Store.state.user.token
  },
  onChange () {}
}
