<template>
  <div class="filters">
    <!-- <label for="component-dropdown">Component-based dropdown: </label>
    <dropdown id="component-dropdown" :options="fruitOptions" v-model="selectedFruit"></dropdown> -->
    <label for="autocomplete-dropdown">Autocomplete dropdown: </label>
    <autocomplete-dropdown
      id="autocomplete-dropdown"
      :options="fruitOptions"
      v-model="selectedFruit"
      placeholder="Enter a fruit name"
      ></autocomplete-dropdown>
      <hr>
      <date-range-picker v-model="selectedDateRange"></date-range-picker>

      <div class="filter">
        <date-range-picker v-model="selectedDateRange"></date-range-picker>
      </div>

    <div class="result">
      Selected: <strong>{{ selectedFruit }}</strong>
      <hr>
      Selected range: <strong v-if="selectedDateRange">{{ selectedDateRangeFormatted }}</strong>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import Dropdown from '@/components/Dropdown'
import AutocompleteDropdown from '@/components/AutocompleteDropdown'
import DateRangePicker from '@/components/DateRangePicker'

export default {
  components: {
    'dropdown': Dropdown,
    'autocomplete-dropdown': AutocompleteDropdown,
    'date-range-picker': DateRangePicker
  },
  data() {
    return {
      selectedFruit: '',
      fruitOptions: {
        'Apple': 'Apple',
        'Banana': 'Banana',
        'Blueberry': 'Blueberry',
        'Kiwi': 'Kiwi',
        'Pear': 'Pear',
        'Pineapple': 'Pineapple',
        'Watermelon': 'Watermelon'
      },
      selectedDateRange: {
        from: new Date(),
        to: new Date()
      }
    }
  },
  computed: {
    selectedDateRangeFormatted() {
      if (this.selectedDateRange) {
        return moment(this.selectedDateRange.from).format('L LT') + ' - ' +
              moment(this.selectedDateRange.to).format('L LT')
      } else {
        return 'None'
      }
    }
  }
}
</script>

<style scoped>
.filters {
  width: 800px;
  margin: 0 auto;
}

.filter {
  text-align: left;
}

.result {
  margin-top: 30px;
  text-align: left;
}

label {
  display: block;
}
</style>
