<template>
    <div class="auth-container">
      <div class="auth-box shadow-lg p-4 rounded">
        <h3 class="text-center mb-4">Registrate</h3>
  
        <!-- Inputs -->
        <input
          type="email"
          class="form-control mb-3"
          placeholder="Email"
          v-model="email"
        />
        <input
          type="password"
          class="form-control mb-3"
          placeholder="password"
          v-model="password"
        />
  
        <!-- Botón -->
        <button class="btn btn-primary w-100" @click="register">
          Registrate
        </button>
  
        <!-- Mensajes -->   
        <p class="text-success mt-3" v-if="successMessage">{{ successMessage }}</p>
        <p class="text-danger mt-3" v-if="errorMessage">{{ errorMessage }}</p>
        <p class="text-center mt-3">¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
      </div>
    </div>
  </template>

  <script>

import { createUserWithEmailAndPassword, auth } from "@/auth";

export default {
  name: 'App',

  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // Variable para el mensaje de error
      successMessage: '', // Variable para el mensaje de éxito
    }
  },
  methods: {
    async register() {
      try {
        // Intentar crear el usuario
        const userCredentials = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredentials.user;
        console.log('Usuario creado:', user);
        this.$router.push('/Login');

        // Mostrar mensaje de éxito
        this.successMessage = 'Usuario creado exitosamente. ¡Bienvenido!';
        this.errorMessage = ''; // Limpiar cualquier mensaje de error
      } catch (err) {
        // Manejar errores específicos de Firebase
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = 'El correo electrónico ya está registrado. Intenta con otro.';
        } else if (err.code === 'auth/invalid-email') {
          this.errorMessage = 'El correo electrónico no es válido. Verifica el formato.';
        } else if (err.code === 'auth/weak-password') {
          this.errorMessage = 'La contraseña es muy débil. Intenta con una contraseña más segura.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrar el usuario. Intenta nuevamente.';
        }
        console.error('Error al registrar usuario:', err);

        // Limpiar el mensaje de éxito si ocurre un error
        this.successMessage = '';
      }
    },
  },
};

</script>

<style scoped>
/* Fondo con degradado */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #2d4b69, #001233);
}

/* Caja del formulario */
.auth-box {
  background-color: white;
  max-width: 400px;
  width: 100%;
}

/* Botón personalizado */
.btn-primary {
  background-color: #00c6ff;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
}
.btn-primary:hover {
  background-color: #0072ff;
  transform: scale(1.05);
}

/* Sombras */
.shadow-lg {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>

  