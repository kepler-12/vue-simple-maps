<template functional>
</template>

<script>
const props = {
  position: {
    type: Object,
    required: false
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
        position: {
          lat: this.position.lat || this.position.latitude,
          lng: this.position.lng || this.position.longitude
        }
      }
    }
  },
  mounted() {
    const map = this.$parent.map

    this.marker = new google.maps.Marker({ map, ...this.settings })
    this.$parent.$emit('marker-added')
    this.info = new google.maps.InfoWindow({ content: this.$el.innerHTML })

    this.marker.addListener('click', () => {
      this.$parent.$emit('info-open')
      this.info.open(map, this.marker)
    })
  }
}
</script>
