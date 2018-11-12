import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

export const eventBus = new Vue({
  data: {
    menuItems: [
      {id: 1, name: 'Burger', price: '5.67', description: 'Beef patty, American Cheese, Pickle, Onion, Lettuce, Tomato'},
      {id: 2, name: 'Fries', price: '1.23', description: 'Thin cut potato fries'},
      {id: 3, name: 'Chick Strips', price: '6.78', description: '4 count chicken strips'},
    ],
    orderItems: [],
    total: 0
  },
  methods: {
    addToOrder(order) {
      const menuItem = this.menuItems.find(item => item.id == order.menuId)
      const newOrder = {
        id: this.orderItems.length,
        menuId: order.menuId,
        quantity: order.quantity,
        note: order.note,
        name: menuItem.name,
        price: parseFloat(menuItem.price).toFixed(2)
      }
      this.orderItems.push(newOrder)
      this.updateTotal(newOrder.price * newOrder.quantity)
      this.$emit('orderAdded', newOrder)
    },
    removeFromOrder(orderId) {
      const index = this.orderItems.findIndex(item => item.id == orderId)
      this.updateTotal(-(this.orderItems[index].price * this.orderItems[index].quantity))
      this.orderItems.splice(index, 1)
      this.$emit('removedItem')
    },
    updateTotal(amt) {
      return this.total += amt
    },
    getTotal() {
      return parseFloat(this.total).toFixed(2)
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
