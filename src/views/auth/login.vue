<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';
import Cookies from 'js-cookie';

const router = useRouter();
const user = reactive({
  email: '',
  password: '',
})

const validation = ref([]);
const loginFailed = ref([]);

const login = async () => {
  await api.post('/api/login', {
    email: user.email,
    password: user.password
  })
    .then(response => {
      Cookies.set('token', response.data.data.token)
      Cookies.set('user', JSON.stringify(response.data.data.user))

      if (Cookies.get('token')) {
        router.push({ name: 'dashboard'})
      }
    })
    .catch(error => {
      validation.value = error.response.data
      loginFailed.value = error.response.data
    })
}

</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="card border-0 rounded shadow-sm">
        <div class="card-body">
          <h4>Login</h4>
          <hr/>
          <div v-if="validation.errors" class="mt-2 alert alert-danger">
            <ul class="mt-0 mb-0">
              <li v-for="(error, index) in validation.errors" :key="index">
                {{ `${error.path} : ${error.msg}` }}
              </li>
            </ul>  
          </div>
          <form @submit.prevent="login">
            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Email Address</label>
              <input type="email" v-model="user.email" class="form-control" placeholder="Email Address"/>
            </div>
            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Password</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="Email Address"/>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>  
    </div>  
  </div>  
</template>