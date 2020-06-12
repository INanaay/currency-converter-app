<template>
  <div id="app">
    <div id="header">
      <h1>Currency Converter</h1>
    </div>
    <MainPage/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import MainPage from './components/MainPage';

export default {
  name: 'App',
  components: {
    MainPage,
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
