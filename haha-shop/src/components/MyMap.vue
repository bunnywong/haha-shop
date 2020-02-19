<template>
  <div class="mymap">
    <div class="mymap__form-wrapper">
    </div>
    <div class="mymap__map-wrapper">
      <gmap-map
        :center="mapCenter"
        :zoom="mapZoom"
        ref="map"
      >
      </gmap-map>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mapCenterRef: {
      type: Object,
      default: function () {
        return {
          // Central, Hong Kong
          lat: 22.27583223,
          lng: 114.154832714
        }
      }
    }
  },
  data () {
    return {
      mapZoom: 11,
      mapCenter: this.mapCenterRef,
      mapCounter: 0
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
desktop = 768px
.vue-map-container
  height 100vh
  width 100vw
  @media (min-width desktop)
    width 100%
</style>
