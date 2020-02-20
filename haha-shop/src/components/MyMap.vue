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
        <gmap-polyline
          v-if="mapPathObj"
          :path="mapPathObj"
          :editable="false"
        >
        </gmap-polyline>
         <gmap-marker
          v-if="path"
          :draggable="false"
          v-for="(item, index) in path"
            :key="item.id"
            :position="{
              lat: parseFloat(item[0]),
              lng: parseFloat(item[1])
            }"
            :label="{
              text: (index + 1).toString(),
              color: 'white'
            }"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
const config = require('../../config/config.js')
const axios = require('axios')

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
      retryCounter: 0,
      path: [],
      mapZoom: 11,
      mapCenter: this.mapCenterRef,
      mapCounter: 0,
      isWarningClass: false
    }
  },
  computed: {
    mapPathObj: function () {
      return this.path.map(function (item) {
        return {
          lat: parseFloat(item[0]),
          lng: parseFloat(item[1])
        }
      })
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
      this.path = []
      this.totalDistance = this.totalTime = ''
      if (this.startingLocation && this.dropoffPoint) {
        this.getToken()
      }
    },
    getToken () {
      let self = this
      self.isWarningClass = false
      self.message = 'Querying route...'
      const url = `${config.MOCK_API_DOMAIN}/route`
      axios
        .post(url, {
          origin: self.startingLocation,
          destination: self.dropoffPoint
        })
        .then(response => {
          self.getRoute(response.data.token)
        })
        .catch(error => {
          self.isWarningClass = true
          self.message = error
        })
    },
    getRoute (token) {
      let self = this
      if (this.retryCounter > 5) {
        self.isWarningClass = true
        this.message = 'Server busy, please try again later'
        return
      }
      self.isWarningClass = false
      self.message = 'Collecting route...'
      const url = `${config.MOCK_API_DOMAIN}/route/${token}`
      axios
        .get(url)
        .then(response => {
          if (response.data.status === 'in progress') {
            self.isWarningClass = false
            self.message = 'Collecting route in progress...'
            self.retryCounter++
            self.getRoute(token)
          } else if (response.data.status === 'failure') {
            // error handle: Location not accessible by car
            self.isWarningClass = true
            self.message = response.data.error
          } else {
            self.isWarningClass = false
            self.message = ''
            self.totalDistance = response.data.total_distance
            self.totalTime = response.data.total_time
            self.path = response.data.path
          }
        })
        .catch(error => {
          self.isWarningClass = true
          self.message = error
        })
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
.mymap
  text-align left
  &__form
    padding 10px
    &-wrapper
      float left
      width 100%
      @media (min-width desktop)
        padding 20px
        width 300px
    &-text-input
      width calc(100% - 30px)
      margin-top 10px
      margin-bottom 20px
      height 30px
      text-indent 5px
      font-size 16px
      border 1px solid lightgray
    &-cleaner-cross
      cursor pointer
      font-size 30px
      margin-left 5px
    &-message
      color green
    &-message.red
      color #f16722
    &-bottom-wrapper
      margin-top 20px
      @media (min-width desktop)
        margin-top 100px
    &-button
      padding 10px
      min-width 100px
      border-radius 2px
      border 1px solid lightgray
      background-color transparent
      box-shadow 1px 1px lightgray
      &[type=submit]
        margin-left 20px
      &-wrapper
        margin-top 20px
  &__map-wrapper
    float left
    @media (min-width desktop)
      width calc(100% - 460px)
</style>
