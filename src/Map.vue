<template>
  <div class="google-map">
    <slot v-if="loaded" default />
  </div>
</template>

<script>
/* global google */
import themes from './assets/themes'

// The props for our component
const props = {
  onChange: {
    type: Function,
    required: false
  },
  apiKey: {
    type: String,
    required: false
  },
  ui: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    required: false
  },
  theme: {
    type: String,
    required: false,
    validator(value) {
      return Object.keys(themes).includes(value)
    }
  },
  // Set the position of the map from a list of locations
  // Requires an array of objects with lat / lng props
  centerMapAround: {
    type: Array,
    required: false
  }
}

// Our component!
export default {
  name: 'Map',
  props,
  data: () => ({ map: {}, loaded: false, info: {}, cluster: null }),
  created() {
    !window.google &&
      this.initGoogleMaps().then(
        () => {
          this.attachMap()
          if (this.centerMapAround)
            this.positionMapFromLocations()

            // For each map event we want to follow, set an event listener and return a cb
            // which calls our onChange prop with the currently visible markers
          ;['bounds_changed'].map(event =>
            google.maps.event.addListener(this.map, event, () => this.onChange(this.visibleMarkers))
          )
        },
        e => console.log(e)
      ) // Add error handling later :)

    this.$on('info-open', () => this.$children.map(({ info }) => info.close()))

    if (this.options.cluster) {
      this.$on('marker-change', newMarker => {
        this.cluster && this.cluster.addMarker(newMarker)
      })
    }
  },
  computed: {
    // Combine the values of the "options" prop with some sensible defaults
    mergedOptions() {
      let options = {
        zoom: 15,
        center: { lat: 41.885878, lng: -71.411963 },
        disableDefaultUI: !this.ui,
        ...this.options
      }

      if (this.theme) {
        options.styles = themes[this.theme]
      }

      return options
    },
    visibleMarkers() {
      let results = this.$children.filter(({ marker }) => this.map.getBounds().contains(marker.getPosition()))
      return results[0].locationObject
        ? results.map(({ locationObject }) => locationObject)
        : results.map(({ key }) => key)
    }
  },
  watch: {
    centerMapAround() {
      this.positionMapFromLocations()
    }
  },
  methods: {
    /**
     * Helpful api for the clusterer here:
     *     http://htmlpreview.github.io/?https://github.com/googlemaps/v3-utility-library/blob/master/markerclusterer/docs/reference.html
     */
    initClusterScript() {
      return new Promise((resolve, reject) => {
        let cluster = document.createElement('script')
        cluster.type = 'text/javascript'
        cluster.setAttribute(
          'src',
          '//developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'
        )
        cluster.onload = resolve
        cluster.onerror = reject
        document.body.appendChild(cluster)
      })
    },
    setCluster(newMarker) {
      if (!this.cluster) {
        this.initClusterScript().then(() => {
          let cluster = new MarkerClusterer(this.map, this.$children.map(({ marker }) => marker), {
            imagePath: 'https://s3.amazonaws.com/vue-simple-maps/m'
          })
          this.cluster = cluster
        })
      }
    },
    initGoogleMaps() {
      if (this.options.cluster) this.initClusterScript()

      return new Promise((resolve, reject) => {
        // Attach the Google Maps API Script to the Site
        let googleMaps = document.createElement('script')
        googleMaps.setAttribute('async', true)
        googleMaps.setAttribute('defer', true)
        googleMaps.type = 'text/javascript'
        googleMaps.setAttribute('src', `//maps.googleapis.com/maps/api/js?key=${this.apiKey}`)
        googleMaps.onload = resolve
        googleMaps.onerror = reject
        document.body.appendChild(googleMaps)
      })
    },
    attachMap() {
      this.map = new google.maps.Map(this.$el, this.mergedOptions)
      this.setCluster()

      this.loaded = true
    },
    positionMapFromLocations() {
      let bound = new google.maps.LatLngBounds()
      this.centerMapAround.map(({ position, lat, lng, latitude, longitude }) => {
        bound.extend(
          new google.maps.LatLng(
            position.lat || position.latitude || lat || latitude,
            position.lng || position.longitude || lng || longitude
          )
        )
      })
      this.map.fitBounds(bound)
    }
  }
}
</script>

<style>
.google-map {
  height: 500px;
  width: 100%;
}
</style>
