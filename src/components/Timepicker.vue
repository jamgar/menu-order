<template>
  <input
    type="number"
    class="form-control text-center"
    :value="field"
    @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: ['field'],
}
</script>

<style lang="css">
</style>
