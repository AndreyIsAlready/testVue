import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [],
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts
    }
  },
  actions: {
    async getContacts(ctx) {
      let contacts = await axios.get(`http://localhost:3000/contacts?user_id=${localStorage.getItem('userId')}`);
      ctx.commit('setContacts', contacts.data)
    }
  },
 getters: {
    getStateContact(state) {
      return state.contacts;
    }
 }
})
