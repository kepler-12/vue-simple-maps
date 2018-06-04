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
  },
  icon: {
    type: String,
    required: false
  },
  iconSize: {
    type: String,
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
      let settings = {
        ...this.options,
        position: {
          lat: this.position.lat || this.position.latitude,
          lng: this.position.lng || this.position.longitude
        }
      }

      if (this.icon) {
        settings.icon = {
          scaledSize: new google.maps.Size(this.iconSize || 25, this.iconSize || 25),
          url: this.icon
        }
      }

      return settings
    }
  },
  methods: {
    setupInfoWindow(map) {
      this.info = new google.maps.InfoWindow({ content: this.$el.innerHTML })
      this.marker.addListener('click', () => {
        this.$parent.$emit('info-open')
        this.info.open(map, this.marker)
      })
    },
    update() {
      this.$parent.$emit('marker-change', this.marker)
    }
  },
  mounted() {
    const map = this.$parent.map
    // initalize the marker
    this.marker = new google.maps.Marker({ map, ...this.settings })

    // tell the map there's a new marker (useful for resizing, centering, etc.)
    this.update(this.marker)

    // initialize the info window, if content is present
    if (this.$slots.default) this.setupInfoWindow(map)
  },
  destroyed() {
    this.update()
  }
}
</script>
