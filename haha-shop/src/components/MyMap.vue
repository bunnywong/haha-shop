<template>
  <div class="mymap">
    <div class="mymap__form-wrapper" ref="mymapFormWrapper">
      <form class="mymap__form">
        <div class="mymap__form-starting-location">Starting location</div>
        <gmap-autocomplete
          class="mymap__form-text-input"
          placeholder=""
          :value="startingLocation"
          :select-first-on-enter="true"
          @place_changed="setStartingLocation"
          ref="startingLocation">
        </gmap-autocomplete>
        <span class="mymap__form-cleaner-cross" v-show="startingLocation" v-on:click="startingLocation = ''">x</span>
        <div class="mymap__form-drop-off-point">Drop-off point</div>
        <gmap-autocomplete
          class="mymap__form-text-input"
          placeholder=""
          :value="dropoffPoint"
          :select-first-on-enter="true"
          @place_changed="setDropoffPoint"
          ref="dropoffPoint">
        </gmap-autocomplete>
        <span class="mymap__form-cleaner-cross" v-show="dropoffPoint" v-on:click="dropoffPoint = ''">x</span>
        <div class="mymap__form-bottom-wrapper">
          <div v-show="message" class="mymap__form-message" :class="{red: isWarningClass}">{{ message }}</div>
          <div v-show="totalDistance">total distance: {{ totalDistance }}</div>
          <div v-show="totalTime">total time: {{ totalTime }}</div>
          <div class="mymap__form-button-wrapper">
            <input type="reset" class="mymap__form-button" value="Reset" v-on:click="startingLocation = ''; dropoffPoint = ''; message = ''; totalTime = ''; totalDistance = ''">
            <input type="submit" class="mymap__form-button" :value="totalTime ? 'Re-submit' : 'Submit'" @click="formSubmit()">
          </div>
        </div>
      </form>
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
      startingLocation: '',
      dropoffPoint: '',
      message: '',
      totalDistance: '',
      totalTime: '',
      mapZoom: 11,
      mapCenter: this.mapCenterRef,
      mapCounter: 0,
      isWarningClass: false
    }
  },
  methods: {
    setStartingLocation (place) {
      this.startingLocation = place.formatted_address
    },
    setDropoffPoint (place) {
      this.dropoffPoint = place.formatted_address
    },
    formSubmit () {
      this.totalDistance = this.totalTime = ''
      if (this.startingLocation && this.dropoffPoint) {
      }
    }
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
