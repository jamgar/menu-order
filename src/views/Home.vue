<template>
  <div class="home">
    <section id="main">
      <img src="../assets/table-of-food.jpg" alt="table of food">
      <div id="main-text">
        <h1>Welcome to Eating...</h1>
      </div>
    </section>
  </div>
</template>

<script>
</script>

<style lang="scss">
  #main {
    color: white;
    font-family: 'Spicy Rice', cursive;
    max-height: calc(90vh - 50px);
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  img {
    width: 100%;
  }
  #main-text {
    left: 50%;
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    h1 {
      animation: rotate-text;
      animation-duration: 2s;
      font-size: 4rem;
      text-shadow: rg
    }
  }
  @keyframes rotate-text {
    from {
      transform: rotate(-30deg);
    }
    to {
      transform: rotate(0);
    }
  }
</style>
