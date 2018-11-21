<template>
  <div class="card">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="card-header bg-transparent font-weight-bold">
      {{ item.name }}
      <span class="float-right">${{ item.price }}</span>
    </div>
    <div class="card-body">
      <p class="card-text"><small>{{ item.description }}</small></p>
      <input
        type="text"
        placeholder="Enter note..."
        class="note"
        v-model="note">
      <div class="row">
        <div class="col">
          <button
            class="btn btn-sm btn-secondary"
            @click="addMenuItem">+ Add Item</button>
        </div>
        <div class="col">
          <div class="input-group input-group-sm ml-auto">
            <div class="input-group-prepend">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      error: '',
      note: '',
      quantity: 1
    }
  },
  methods: {
    addMenuItem() {
      if (this.checkQuantity(this.quantity)) {
        const order = {
          menuId: this.item.id,
          quantity: this.quantity,
          note: this.note
        }
        this.$emit('addMenuItem', order);
        this.resetQty()
      }
    },
    increaseQty() {
      this.quantity++
    },
    decreaseQty() {
      if (this.quantity > 1 ) {
        this.quantity--
      }
    },
    checkQuantity(value) {
      if (isNaN(value) || value <= 0) {
        this.error = 'Not a valid quantity'
        return false
      } else {
        this.error = ''
        return true
      }
    },
    resetQty() {
      this.quantity = 1
      this.error = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    transition: 1s;
    margin-bottom: 10px;
    &:hover {
      border: 1px solid lightgrey !important;
      box-shadow: 5px 5px 18px grey;
    }
  }
  .card-body {
    padding: 1rem;
  }
  .note {
    border: none;
    border-bottom: 1px solid #F3F3F3;
    color: #007bff;
    display: block;
    margin-bottom: 10px;
    width: 100%
  }
  .input-group {
    width: 95px;
  }
  .qty-btn {
    border-color: #C3C3C3;
  }
</style>
