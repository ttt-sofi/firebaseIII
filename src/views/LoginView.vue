<template>
  <div class="login-container">
    <div class="login-box shadow-lg p-4 rounded">
      <h3 class="text-center mb-4 ">Inicio de sesión</h3>
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
        placeholder="Password"
        v-model="password"
      />

      <!-- Botón -->
      <button class="btn btn-primary w-100" @click="signIn">
        Iniciar sesión
      </button>

      <!-- Mensajes -->
      <p class="text-danger mt-3" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, auth } from "@/auth";

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async signIn() {
      try {
        const { email, password } = this;

        // Intentar iniciar sesión con Firebase
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        // Redirigir al usuario a la página /about
        this.$router.push('/Home');
      } catch (error) {
        console.error('Error en las credenciales:', error);
        if (error.code === 'auth/invalid-credential') {
          this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
        } 
      else {
        console.error('Error al iniciar sesión', error);
      }
      }
    },
  }
};

</script>

<style scoped>
/* Fondo con degradado oscuro */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #2d4b69, #001233);
}

/* Caja del formulario */
.login-box {
  background-color: white;
  max-width: 400px;
  width: 100%;
}

/* Botón personalizado */
.btn-primary {
  background-color: #397dc1;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
}
.btn-primary:hover {
  background-color: #002a60;
  transform: scale(1.05);
}

/* Sombras */
.shadow-lg {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}
</style>
