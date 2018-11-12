<template>
  <div id="order-list">
    <h4 class="text-center">Your Order</h4>
    <transition-group name="slide">
      <app-order-list-item v-for="(item, index) in orderItems"
        :item="item"
        :key="index"
        @removeMenuItem="removeItem"></app-order-list-item>
    </transition-group>
    <div v-if="orderTotal > 0" id="order-total">
      <p class="float-right">Total: ${{ orderTotal }}</p>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../main.js'
  import OrderListItem from './OrderListItem.vue'

  export default {
    components: {
      appOrderListItem: OrderListItem
    },
    data() {
      return {
        orderItems: [],
        orderTotal: 0
      }
    },
    methods: {
      removeItem(orderId) {
        const idx = this.orderItems.findIndex(item => item.id == orderId)
        this.orderItems.splice(idx, 1)
        eventBus.removeFromOrder(orderId)
      },
      getOrderTotal() {
        this.orderTotal = eventBus.getTotal()
      }
    },
    created() {
      eventBus.$on('orderAdded', (order) => {
        this.orderItems.push(order)
        this.getOrderTotal()
      })
      eventBus.$on('removedItem', () => {
        this.getOrderTotal()
      })
    }
  }
</script>

<style lang="scss">
  #order-list {
    padding: 1rem;
  }
  .slide-enter {
    opacity: 0
  }
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }
  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
  }
  .slide-move {
      transition: transform 1s;
  }
  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>
