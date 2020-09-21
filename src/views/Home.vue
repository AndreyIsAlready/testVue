<template>
  <div class="home">
    <div class="header">
      <span> Привет {{ name }}</span>
      <button class="btn btn-warning" @click="logout">
        выход
      </button>
    </div>
    <div>
      <div class="add-contact">Добавить контакт</div>
      <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input @input="searchContact($event)" class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
               aria-label="Search">
      </form>
      <div class="contacts-table">
        <div class="contacts" v-for="contact in contacts"
             :key="contact.id"
        >
          <div>{{ contact.name }}</div>
          <div>{{ contact.number }}</div>
          <div>{{ contact.email }}</div>
          <div @click="deleteContact(contact.id)" class="delete">&#10060;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    name: 'Home',
    components: {
    },
    data() {
      return{
        name: localStorage.getItem('name'),
        contacts: []
      }
    },
    computed: mapGetters(['getStateContact']),
    methods: {
      ...mapActions(['getContacts']),
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
          this.contacts =  this.contacts.filter(elem => {
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
</style>