<template>
  <div id="app">
    <my-map />
  </div>
</template>

<script>
import MyMap from './components/MyMap'

export default {
  name: 'App',
  components: {
    MyMap
  }
}
</script>

<style>
body {
  margin: 0 !important
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
