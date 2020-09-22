<template>
  <div class="home">
    <new-contact @addContact="newContact" v-if="getAddNewContact"></new-contact>
    <div class="header">
      <span> Привет {{ name }}</span>
      <button class="btn btn-warning" @click="logout">
        выход
      </button>
    </div>
    <div>
      <div @click="addContact" class="add-contact">Добавить контакт</div>
      <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input @input="searchContact($event)" class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
               aria-label="Search">
      </form>
      <div class="contacts-table">
        <div class="contacts" v-for="(contact, key) in contacts"
             :key="contact.id"
        >
          <div @dblclick="edit($event, contact.id)">
            <span :data-id="contact.id">{{ contact.name }}</span>
            <input @blur="closeInput($event)" @keydown="editFieldContact($event, contact.id, key)" :data-id="contact.id" v-model="contact.name" class="inputInvisible" type="text">
          </div>
          <div @dblclick="edit($event, contact.id)">
            <span :data-id="contact.id">{{ contact.number }}</span>
            <input @blur="closeInput($event)" @keydown="editFieldContact($event, contact.id, key)" :data-id="contact.id" v-model="contact.number" class="inputInvisible" type="text">
          </div>
          <div @dblclick="edit($event, contact.id)">
            <span :data-id="contact.id">{{ contact.email }} </span>
            <input @blur="closeInput($event)" @keydown="editFieldContact($event, contact.id, key)" :data-id="contact.id" v-model="contact.email" class="inputInvisible" type="text">
          </div>
          <div @click="deleteContact(contact.id)" class="delete">&#10060;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import newContact from '../components/NewContact.vue'
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
      newContact
    },
    data() {
      return{
        name: localStorage.getItem('name'),
        contacts: [],
      }
    },
    computed: mapGetters(['getStateContact', 'getAddNewContact']),
    methods: {
      ...mapActions(['getContacts']),
      ...mapMutations(['switchAddNewContact']),
      logout() {
        localStorage.setItem('auth', false);
        this.$router.push('auth');
      },

      async checkAuth() {
        if (localStorage.getItem('auth') === 'false') {
          this.$router.push('auth');
          return
        }
        await this.getContacts();
      },

      async deleteContact(id) {
        await axios.delete(`http://localhost:3000/contacts/${id}`);
        this.contacts.forEach((elem, index) => {
          if (elem.id === id) {
            this.contacts.splice(index, 1);
          }
        })
      },

      async searchContact(e) {
        await this.getContacts();
        this.contacts = this.getStateContact;
        if (e.target.value.length !== 0) {
          this.contacts = this.contacts.filter(elem => {
            if (
                    !elem.name.startsWith(e.target.value) &&
                    !elem.email.startsWith(e.target.value) &&
                    !elem.number.startsWith(e.target.value)
            ) {
              return;
            }
            return elem;
          })
        }
      },
      addContact() {
        this.switchAddNewContact(true);
      },
      async newContact() {
        await this.getContacts();
        this.contacts = this.getStateContact;
      },
      edit(e, id) {
        if (e.target.tagName === 'INPUT') {
          return
        }
        let inp;
        let span;
        if (e.target.tagName === 'DIV') {
          inp = e.target.querySelector('input');
          span = e.target.querySelector('span');
        } else {
          inp = e.target.parentNode.querySelector('input');
          span = e.target;
        }

        inp.classList.remove('inputInvisible');
        inp.classList.add('inputVisible');
        inp.focus();
        span.style = 'display: none';
        this._closeEditInput(inp.value, id)
      },

      editFieldContact(e, id, key) {
        if (e.code === 'Enter') {
          axios.patch(`http://localhost:3000/contacts/${id}`, {[key]: e.target.value})
          this.closeInput(e)
        }
      },

      closeInput(e) {
        e.target.classList.remove('inputVisible');
        e.target.classList.add('inputInvisible');
        e.target.parentNode.querySelector('span').style = 'dispay:none';
      },

      _closeEditInput(value, id) {
        let table = document.querySelector('.contacts-table');
        let spans = table.querySelectorAll('span');
        let inputs = table.querySelectorAll('input');
        this._forEachInputAndSpan(spans, inputs, value, id)
      },
      _forEachInputAndSpan(spans, inputs, value) {
        [...spans].forEach(elem => {
           if (getComputedStyle(elem).display === 'none' && elem.innerHTML.trim() !== value ) {
              elem.style = 'display:block';
           }
        });

        [...inputs].forEach(elem => {
          if (elem.classList.contains('inputVisible') && elem.value !== value ){
            elem.classList.add('inputInvisible');
            elem.classList.remove('inputVisible');
          }
        })
      }
    },
    async mounted() {
      await this.checkAuth();
      this.contacts = this.getStateContact;
    },
  }
</script>

<style lang="scss" scoped>
  .header{
    display: grid;
    width: 99vw;
    grid-template-columns: 25% 1fr;
    margin-top: 2%;
    margin-bottom: 3%;
    background: #2c3e50;
    border-radius: 5px;
    height: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.99);
    justify-items: end;

    span{
      margin-left: 5%;
      font-size: 20px;
      vertical-align: middle;
      text-align: left;
      color: #dfe7f7;
    }
    button{
      display: grid;
      width: 120px;
      height: 40px;
      margin-right: 10%;
    }
  }

  .contacts{
    margin-top: 2%;
    display: grid;
    grid-template-columns: 15% 15% 15% 15%;
    color: #dfe7f7;
    height: 50px;
    font-size: 17px;
    justify-items: center;
    justify-content: center;
    box-shadow: 0 10px 15px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

    button{
      width: 120px;
      height: 40px;
    }
  }

  .contacts:hover{
    background: #2c3e50;
    cursor: pointer;
  }

  .contacts-table{
    display: grid;
  }

  .search{
    width: 99vw;
    background: linear-gradient(90deg, rgb(26, 45, 66), rgb(41, 35, 42));
    background: -moz-linear-gradient(left top, rgb(26, 45, 66), rgb(41, 35, 42) 100%);
    color: #dfe7f7;
  }
  .delete{
    font-size: 30px;
    color: white;
  }

  .add-contact{
    background: #2c3e50;
    margin-bottom: 10px;
    border-radius: 5px;
    width: 25vw;
    color: #dfe7f7;
    box-shadow: 0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  .add-contact:hover{
    cursor: pointer;
  }

  .inputInvisible {
    display: none;
  }

  .inputVisible {
    display: block;
  }
</style>