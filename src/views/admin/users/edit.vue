<script setup>
import SidebarMenu from '../../../components/SidebarMenu.vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Cookies from 'js-cookie';
import api from '../../../services/api';

const router = useRouter();
const route = useRoute();
const token = Cookies.get('token');
const user = reactive({
  name: '',
  email: '',
  password: '',
});
const validation = ref([]);

console.log(route.params.id)
onMounted(async () => {
  api.defaults.headers.common['Authorization'] = token;
  await api.get(`/api/admin/user/${route.params.id}`)
    .then(response => {
      user.name = response.data.name
      user.email = response.data.email
      console.log(user.name)
    })
    .catch(error => {
      console.error('Gagal fecth user:',error)
    })
})

const updateUser = async () => {
  api.defaults.headers.common['Authorization'] = token;
  await api.put(`/api/admin/user/${route.params.id}`, {
    name: user.name,
    email: user.email,
    password: user.password
  })
    .then(() => {
      router.push({
        name: 'admin.users.index'
      })
    })
    .catch(error => {
      validation.value = error.response.data
    })
}
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu/>
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-header">
            <div>
              Edit User
            </div>
          </div>
          <div class="card-body">
            <div v-if="validation.errors" class="mt-2 alert alert-danger">
              <ul class="mt-0 mb-0">
                <li v-for="(error, index) in validation.errors" :key="index">
                    {{ `${error.path} : ${error.msg}` }}
                </li>  
              </ul>
            </div>
            <form @submit.prevent="updateUser">
              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Full Name</label>
                <input type="text" v-model="user.name" class="form-control" placeholder="Full Name"/>  
              </div>  
              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Email Address</label>
                <input type="email" v-model="user.email" class="form-control" placeholder="Email Address"/>  
              </div>  
              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Password</label>
                <input type="password" v-model="user.password" class="form-control" placeholder="Password"/>  
              </div>
              <button type="submit" class="btn btn-primary btn-sm">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>