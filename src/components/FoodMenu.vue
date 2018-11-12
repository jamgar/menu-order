<template>
  <div id="food-menu">
    <h1 class="text-center pb-2">Food Menu</h1>
    <div class="container">
      <div class="row">
        <app-food-menu-item v-for="item in menuItems"
          :item="item"
          @addMenuItem="addItem"
          class="col-sm-6"></app-food-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main.js'
import FoodMenuItem from './FoodMenuItem.vue'

export default {
  name: 'FoodMenu',
  data() {
    return {
      menuItems: [],
    }
  },
  components: {
    appFoodMenuItem: FoodMenuItem
  },
  methods: {
    addItem(order) {
      eventBus.addToOrder(order)
    }
  },
  mounted() {
    this.menuItems = eventBus.menuItems
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #food-menu {
    padding: 20px 15px 0 15px;
  }
</style>
