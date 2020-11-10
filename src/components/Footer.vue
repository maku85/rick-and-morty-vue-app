<template>
  <v-footer padless dark>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} - Built with
      <span class="heart">❤</span> Vue - by
      <a href="https://github.com/maku85" target="_blank"
        ><strong>maku85</strong></a
      >
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.v-footer {
  background: rgba(30, 30, 30, 0.4) !important;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }

  a {
    margin: 30px 0 30px 0;
    font-size: 14px;
  }
  .heart {
    color: red;
    animation: heartbeat 1s infinite;
    line-height: 0;
  }
}

@keyframes heartbeat {
  0% {
    font-size: 0.9em;
  }
  20% {
    font-size: 1.1em;
  }
  40% {
    font-size: 1.2em;
  }
}
</style>
