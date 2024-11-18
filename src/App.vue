<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">😾</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Opción siempre visible -->
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <!-- Opciones para usuarios no logueados -->
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <router-link class="nav-link" to="/Login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/Singup">Register</router-link>
              </li>
            </template>
            <!-- Opciones para usuarios logueados -->
            <template v-else>
              <li class="nav-item">
                <button class="btn btn-link nav-link" @click="logout">
                  Logout
                </button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Contenido dinámico -->
    <router-view></router-view>
  </div>
</template>

<script>
import { onAuthStateChanged, signOut, auth } from "@/auth";

export default {
  name: "App",
  data() {
    return {
      isAuthenticated: false, // Estado de autenticación
    };
  },
  created() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(auth, (user) => {
      this.isAuthenticated = !!user;
    });
  },
  methods: {
/**
 * Logs out the current user from Firebase authentication.
 * 
 * This function attempts to sign out the user using Firebase's signOut method.
 * Upon successful sign-out, it sets the isAuthenticated flag to false and 
 * redirects the user to the login page. If an error occurs during the sign-out
 * process, it logs the error to the console.
 */
    async logout() {
      try {
        await signOut(auth); // Cerrar sesión en Firebase
        this.isAuthenticated = false;
        this.$router.push("/login"); // Redirigir al login
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
};
</script>

