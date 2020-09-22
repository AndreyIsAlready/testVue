<template>
    <div>
        <div class="home">
            <div class="field">
                <router-link class="link" :to="{name: 'auth'}">login</router-link>
                <div class="form-group">
                    <label for="name">имя</label>
                    <input id="name" class="form-control" type="text" v-model="name" placeholder="введите ваше имя">
                </div>
            </div>
            <div class="field">
                <div class="form-group">
                    <label for="login">логин</label>
                    <input id="login" class="form-control" type="text" v-model="login" placeholder="введите логин">
                </div>
            </div>
            <div class="field">
                <div class="form-group">
                    <label for="password">пароль</label>
                    <input id="password" class="form-control" type="password" v-model="password" placeholder="введите пароль">
                </div>
            </div>
            <div class="field">
                <button @click="register" class="btn btn-primary">войти</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Register",
        data() {
            return{
                name: '',
                login: '',
                password: '',
            }
        },
        methods: {
            async register() {
                let body = {
                    name: this.name,
                    login: this.login,
                    password: this.password,
                };
                let response = await axios.post('http://localhost:3000/users', body);
                if (response.data.id) {
                    this.$router.push('/auth');
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        display: grid;
        margin-top: 15%;
        border: 2px solid black;
        border-radius: 5px;
        width: 500px;
        height: 300px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.99);
        grid-template-rows: 30% 20% 30%;
    }

    .field{
        display: grid;
        justify-items: center;
        margin-top: 10%;
        grid-template-rows: 1fr;

        label{
            color: #6b6b6b;
            font-family: Trebuchet MS, sans-serif;
        }
        button{
            margin-top: 5%;
            width: 30%;
            height: 40px;
        }
    }

    .form-group{
        display: grid;
        grid-template-columns: 70px 1fr;

        input{
            width: 250px;
            height: 30px;
        }

        label{
            text-align: left;
        }
    }

    .error{
        color: red;
    }
    .link{
        margin-left: 50%;
    }
</style>