<template>
  <div id="app">
    <app-header/>
    <b-container fluid>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    </b-container>
  </div>
</template>

<script>
  import Header from './components/Header.vue'

  export default {
    components: {
      appHeader: Header
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Spicy+Rice');
  
  body {
    background-color: #F3F3F3;
  }
  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }
  @keyframes slide-in {
    from {
      transform: translateY(-30);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30);
      opacity: 0;
    }
  }
</style>
