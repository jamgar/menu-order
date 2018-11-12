<template>
  <div class="menu">
    <b-row>
      <b-col sm="8">
        <app-food-menu/>
      </b-col>
      <b-col sm="4" style="background-color: white; height: 100vh">
        <app-order-list/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import FoodMenu from '@/components/FoodMenu'
import OrderList from '@/components/OrderList'

export default {
  name: 'home',
  components: {
    appFoodMenu: FoodMenu,
    appOrderList: OrderList,
  }
}
</script>
