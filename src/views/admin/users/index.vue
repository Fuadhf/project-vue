<script setup>
import SidebarMenu from '../../../components/SidebarMenu.vue';
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import api from '../../../services/api';

const token = Cookies.get('token');
const user = ref([]);
const fecthDataUser = async () => {
  api.defaults.headers.common['Authorization'] = token;
  await api.get('/api/admin/users')
    .then(response => {
      user.value = response.data.data
    })
}

onMounted(() => {
  fecthDataUser();
});

const deleteUser = async (id) => {
  api.defaults.headers.common['Authorization'] = token;
  await api.delete(`/api/admin/user/${id}`)
    .then(() => {
      fecthDataUser();
    })
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu/>
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Users</span>
            <router-link :to="{ name: 'admin.user.create' }" class="btn btn-sm btn-success rounded shadow-sm border-0">Add User</router-link>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white ">
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col" style="width: 17%;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="user.length == 0">
                  <td colspan="4" class="text-center">
                    <div class="alert alert-danger mb-0">
                      Data Belum Tersedia!
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(user, index) in user" :key="index">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'admin.user.edit', params: { id: user.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Edit</router-link>
                    <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>