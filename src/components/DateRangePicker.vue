<template>
  <div>
    <select v-model="selectedRangeType" @change="(event) => { dateRangeChanged(event.target.value) }">
      <option v-for="(option, value) in rangeTypeOptions" :value="value">{{ option }}</option>
    </select>

    <div v-if="selectedRangeType === 'custom'">
      <label>From: <date-picker
                      v-model="fromPickedDate"
                      format="MM/dd/yyyy"
                      @input="dateRangeChanged('custom')"
                      ></date-picker>
      </label>
      <label>To: <date-picker
                    v-model="toPickedDate"
                    format="MM/dd/yyyy"
                    @input="dateRangeChanged('custom')"
                    ></date-picker>
      </label>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vuejs-datepicker'

export default {
  props: {
    value: {
      type: Object,
      validator: function(value) {
        if (value === null) {
          return true
        }

        return  value.hasOwnProperty('from') &&
                value.hasOwnProperty('to') &&
                value.from instanceof Date &&
                value.to instanceof Date
      }
    }
  },
  components: {
    'date-picker': DatePicker
  },
  data() {
    return {
      rangeTypeOptions: {
        yesterday: 'Yesterday',
        today: 'Today',
        thisweek: 'This Week',
        lastweek: 'Last Week',
        thismonth: 'This Month',
        lastmonth: 'Last Month',
        last3months: 'Last 3 Months',
        last6months: 'Last 6 Months',
        custom: 'Custom Range...'
      },
      selectedRangeType: null,
      fromPickedDate: null,
      toPickedDate: null,
    }
  },
  computed: {

  },
  methods: {
    calculateRangeForType (rangeType) {
      switch (rangeType) {
        case 'yesterday':
          return {
            from: moment().subtract(1, 'day').startOf('day').toDate(),
            to: moment().subtract(1, 'day').startOf('day').toDate()
          }

        case 'today':
          return {
            from: moment().startOf('day').toDate(),
            to: moment().endOf('day').toDate()
          }

        case 'thisweek':
          return {
            from: moment().startOf('week').toDate(),
            to: moment().endOf('week').toDate()
          }

        case 'lastweek':
          return {
            from: moment().subtract(1, 'week').startOf('week').toDate(),
            to: moment().subtract(1, 'week').endOf('week').toDate()
          }

        case 'thismonth':
          return {
            from: moment().startOf('month').toDate(),
            to: moment().endOf('month').toDate()
          }

        case 'lastmonth':
          return {
            from: moment().subtract(1, 'month').startOf('month').toDate(),
            to: moment().subtract(1, 'month').endOf('month').toDate()
          }

        case 'last3months':
          return {
            from: moment().subtract(3, 'month').startOf('month').toDate(),
            to: moment().endOf('month').toDate()
          }

        case 'last6months':
          return {
            from: moment().subtract(6, 'month').startOf('month').toDate(),
            to: moment().endOf('month').toDate()
          }

        default:
          return null
      }
    },
    dateRangeChanged(rangeType) {
      if (this.selectedRangeType === 'custom') {
        if (this.fromPickedDate == null || this.toPickedDate == null) {
          return
        } else {
          let dateRange = {
            from: moment(this.fromPickedDate).startOf('day').toDate(),
            to: moment(this.toPickedDate).endOf('day').toDate()
          }
          this.$emit('input', dateRange)
        }
      } else {
        let dateRange = this.calculateRangeForType(rangeType)
        this.$emit('input', dateRange)
      }
    },
    updateComponentWithValue(newValue) {
      if (newValue === null) {
        this.selectedRangeType = null
        this.fromPickedDate = null
        this.toPickedDate = null
      } else {
        var rangeTypes = Object.keys(this.rangeTypeOptions)
        for (var i = 0; i < rangeTypes.length; i++) {
          let preSetRange = this.calculateRangeForType(rangeTypes[i])

          if (preSetRange === null) {
            continue
          }

          if (newValue.from.getTime() === preSetRange.from.getTime() &&
              newValue.to.getTime() === preSetRange.to.getTime()) {
            this.selectedRangeType = rangeTypes[i]
            this.fromPickedDate = null
            this.toPickedDate = null
            return
          }
        }
        this.selectedRangeType = 'custom'
        this.fromPickedDate = newValue.from
        this.toPickedDate = newValue.to
      }
    }
  },
  mounted() {
    this.updateComponentWithValue(this.value)
  },
  watch: {
    value: function(newValue) {
      this.updateComponentWithValue(newValue)
    }
  }
}
</script>

<style lang="css">
</style>
