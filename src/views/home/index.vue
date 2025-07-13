<script setup>

</script>

<template>
  <div class="p-5 mb-4 bg-light shadow-sm rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Vue js</h1>
      <hr/>
      <p class="col-md-12 fs-4">Belajar vue 3</p>
      <router-link :to="{ name: 'register'}" class="btn btn-primary btn-lg me-3">Register</router-link>
      <router-link :to="{ name: 'login'}" class="btn btn-secondary btn-lg">Login</router-link>
    </div>
  </div>
</template>