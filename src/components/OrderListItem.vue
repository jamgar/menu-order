<template>
  <div id="order-list-item">
    <div class="row">
      <h6>{{ item.name }}</h6>
      <small class="ml-auto">Qty: {{ item.quantity }} Cost: {{ getCost }}</small>
    </div>
    <p v-if="item.note"class='text-danger'>{{ item.note }}</p>
    <div class="row">
      <div class="col">
        <button
          class="btn btn-sm text-danger btn-light"
          @click="removeMenuItem">x Remove</button>
      </div>
      <div class="col">
        <div class="input-group input-group-sm ml-auto">
          <!-- <div class="input-group-prepend">
            <button
              class="btn btn-light qty-btn"
              @click="increaseQty">+</button>
          </div>
          <input
            type="text"
            class="form-control text-center"
            placeholder="Qty"
            aria-label="Quantity"
            v-model.number="quantity"
            @input="checkQuantity($event.target.value)"
            @keydown.esc="resetQty">
          <div class="input-group-append">
            <button
              class="btn btn-light qty-btn"
              @click="decreaseQty"
              :disabled="quantity == 1">-</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    getCost() {
      return this.item.price * this.item.quantity
    }
  },
  methods: {
    removeMenuItem() {
      this.$emit('removeMenuItem', this.item.id)
    }
  }
}
</script>

<style lang="scss">
  #order-list-item {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .input-group {
    width: 95px;
  }
  .qty-btn {
    border-color: #C3C3C3;
  }
</style>
