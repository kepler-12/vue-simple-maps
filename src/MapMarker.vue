<template functional>
</template>

<script>
const props = {
  position: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: false
  }
}

export default {
  name: 'MapMarker',
  props,
  data() {
    return {
      marker: {},
      info: ''
    }
  },
  render(createElement) {
    return createElement('div', this.$slots.default)
  },
  computed: {
    settings() {
      return {
        ...this.options,
        position: this.position
      }
    }
  },
  mounted() {
    const map = this.$parent.map

    // Create a marker and set its position.
    this.marker = new google.maps.Marker({
      map,
      position: this.settings.position,
      title: 'Hello World!'
    })

    this.info = new google.maps.InfoWindow({ content: this.$el.innerHTML })
    this.marker.addListener('click', () => {
      this.$parent.$emit('info-open')
      this.info.open(map, this.marker)
    })
  }
}
</script>
