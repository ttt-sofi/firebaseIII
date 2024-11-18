<template>
  <div class="home-container">
    <div class="home-box shadow-lg p-4 rounded text-center">
      <h1 class="text-light">Hola ¿Como estas?</h1>
      <!-- Show the cat picture -->
      <img
        v-if="catImageUrl"
        :src="catImageUrl"
        alt="Foto de un gatito"
        class="rounded"
      />
      <!-- Loading message -->
      <p v-else class="text-light">Cargando una imagen adorable...</p>
      <button class="btn btn-primary mt-3" @click="fetchCatImage">
        Mostrar otro gatito
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catImageUrl: null,
    };
  },
  async created() {
    await this.fetchCatImage();
  },
  methods: {
    async fetchCatImage() {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/images/search",
          {
            headers: {
              "x-api-key":
                "live_sIDmLm0BunHtyJMvxSq8OsNzYQbgys064PabNUGdxQb2ZGR5eCwiu5nJj31LNj6N",
            },
          }
        );
        const data = await response.json();
        this.catImageUrl = data[0]?.url;
      } catch (error) {
        console.error("Error fetching cat image:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Fondo con degradado */
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #1c2233);
}

/* Caja del mensaje */
.home-box {
  background-color: #1e293b;
  color: white;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

/* Imagen */
img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

/* Sombras */
.shadow-lg {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}
</style>
