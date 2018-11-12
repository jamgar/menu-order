<template>
  <div class="dropdown" :class="{'open' : open}">
    <input type="text"
        ref="search"
        :placeholder="placeholder"
        v-model="searchText"
        @input="searchChanged"
        @keydown.enter="suggestionSelected(matches[highlightIndex])"
        @keydown.down="down"
        @keyup.up="up"
        @keydown.esc="setOpen(false)"
        @blur="setOpen(false)"></input>

    <a class="toggle" @mousedown.prevent @click="setOpen(!open)">
      <span class="arrow-up">▲</span>
      <span class="arrow-down">▼</span>
    </a>
    <ul class="suggestion-list">
      <li v-for="(suggestion, index) in matches"
        :class="{'active' : index === highlightIndex}"
        @mousedown.prevent
        @click="suggestionSelected(suggestion)">
        {{ suggestion[0] }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    value: null,
    options: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Enter an item name to search'
    }
  },
  computed: {
    matches() {
      // let optionArray = []
      // for (var key in this.options) {
      //   if (has(this.options, key) && isEnumerable(this.options, key)) {
      //     optionArray.push([key, this.options[key]])
      //   }
      // }
      //
      // return optionArray.filter((option) => {
      //   let optionText = option[0].toUpperCase()
      //   return optionText.match(this.searchText.toUpperCase())
      // })

      // Note: not all browsers support Object.entries so you can use the
      // above 'shim'
      return Object.entries(this.options).filter((option) => {
        let optionText = option[0].toUpperCase()
        return optionText.match(this.searchText.toUpperCase().replace(/\s+/g, '.+'))
      })
    }
  },
  data() {
    return {
      searchText: '',
      selectedOption: null,
      open: false,
      highlightIndex: 0,
      lastSearchText: ''
    }
  },
  methods: {
    setOpen(isOpen) {
      this.open = isOpen

      if (this.open) {
        this.$refs.search.focus()
        this.lastSearchText = this.searchText
        this.searchText = ''
      } else if (this.searchText.trim() === '') {
        this.searchText = this.lastSearchText
      }
    },
    searchChanged() {
      if (!this.open) {
        this.open = true
      }
    },
    suggestionSelected(suggestion) {
      this.open = false
      this.searchText = suggestion[0]
      this.$emit('input', suggestion[1])
    },
    updateComponentWithValue(newValue) {
      if (Object.values(this.options).indexOf(newValue) > -1) {
        // Find the matching text for the supplied option value
        for (var text in this.options) {
          if (this.options.hasOwnProperty(text)) {
            if (this.options[text] === newValue) {
              this.searchText = text
            }
          }
        }
      }
    },
    up() {
      if (this.open) {
        if (this.highlightIndex > 0) {
          this.highlightIndex--
        }
      } else {
        this.setOpen(true)
      }
    },
    down() {
      if (this.open) {
        if (this.highlightIndex < this.matches.length - 1) {
          this.highlightIndex++
        }
      } else {
        this.setOpen(true)
      }
    },
    searchChanged() {
      if (!this.open) {
        this.open = true
      }
      this.highlightIndex = 0
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

<style>
  .dropdown {
    display: inline-block;
    position: relative;
  }
  .suggestion-list {
    background-color: rgba(255, 255, 255, 0.95);
    border: 1px solid #ddd;
    list-style: none;
    display: block;
    margin: 0;
    margin-top: .5rem;
    padding: 0;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 2;
  }
  .dropdown.open .suggestion-list {
    display: block;
  }
  .dropdown .suggestion-list {
    display: none;
  }
  .toggle .arrow-up {
    display: none;
  }
  .open .toggle .arrow-up {
    display: inline-block;
  }
  .open .toggle .arrow-down {
    display: none;
  }
  .suggestion-list li {
    cursor: pointer;
  }
  .suggestion-lit li:hover {
    color: #FFF;
    background-color: #CCC;
  }
  .active {
    color: #FFF;
    background-color: #42b983;
  }
</style>
