<template>
    <div class="new-contact" @click="closeAutClick($event)">
        <div class="modal-window">
            <div class="fields">
                <label class="field-contact">
                    <span>name</span>
                    <input v-model="name" type="text">
                </label>
                <label class="field-contact">
                    <span>number</span>
                    <input v-model="number" type="number">
                </label>
                <label class="field-contact">
                    <span>email</span>
                    <input v-model="email" type="email">
                </label>
                <span v-if="valid" class="validate">запоните все поля</span>
            </div>
            <div>
                <button @click="addNewContactInBase" class="btn btn-primary left-btn">добавить</button>
                <button @click="closeModal" class="btn btn-danger">отменить</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import axios from 'axios'

    export default {
        name: "NewContact",
        data() {
            return {
                name: '',
                number: '',
                email: '',
                valid: false,
            }
        },

        methods: {
            ...mapMutations(['switchAddNewContact']),

            closeModal() {
                    this.switchAddNewContact(false);
            },

            closeAutClick(e) {
                if (e.target.classList.contains('new-contact')) {
                    this.closeModal()
                }
            },

            addNewContactInBase() {
                this.valid = (this.name === '' || this.number === '' || this.email === '');
                if (!this.valid) {
                    let body = {
                        name: this.name,
                        number: this.number,
                        email: this.email,
                        user_id: localStorage.getItem('userId')
                    };

                    axios.post('http://localhost:3000/contacts', body);
                    this.switchAddNewContact(false);
                    this.$emit('addContact');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .new-contact{
        position: absolute;
        display: grid;
        width: 99vw;
        height: 99vh;
        background: rgba(0, 0, 0, 0.59);
        justify-items: center;
    }

    .modal-window{
        margin-top: 4%;
        width: 50vw;
        height: 55vh;
        border-radius: 5px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 80% 20%;
        border: 3px solid #35506b;
        background: linear-gradient(90deg, rgb(26, 45, 66), rgb(41, 35, 42));
        background: -moz-linear-gradient(left top, rgb(26, 45, 66), rgb(41, 35, 42) 100%);
    }
    .field-contact{
        margin-top: 5%;
        display: grid;
        grid-template-columns: 50px 25vw;
        justify-items: center;

        input{
            height: 25px;
            width: 20vw;
        }
        span{
            text-align: left;
            color: rgba(255, 255, 255, 0.99);
        }
    }

    .fields{
        display: grid;
        justify-items: center;
    }
    .left-btn{
        margin-right: 30%;
    }
    .btn{
        height: 5vh;
    }
    .validate{
        color: red;
    }
</style>