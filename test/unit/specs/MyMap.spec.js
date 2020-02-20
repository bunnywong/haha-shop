import Vue from 'vue'
import MyMap from '@/components/MyMap'
import axios from 'axios'

describe('MyMap.vue', () => {
  const Constructor = Vue.extend(MyMap)
  const vm = new Constructor().$mount()

  it('should have correct title', () => {
    expect(vm.$el.querySelector('.mymap__form-starting-location').textContent).toEqual('Starting location')
    expect(vm.$el.querySelector('.mymap__form-drop-off-point').textContent).toEqual('Drop-off point')
  })
  it('should have necessary form elements', () => {
    expect(vm.$el.querySelectorAll('.mymap__form-text-input').length).toEqual(2)
    expect(vm.$el.querySelector('.mymap__form-cleaner-cross').textContent).toEqual('x')
    expect(vm.$el.querySelectorAll('.mymap__form-cleaner-cross').length).toEqual(2)
    expect(vm.$el.querySelectorAll('.mymap__form-button[type=reset]').length).toEqual(1)
    expect(vm.$el.querySelectorAll('.mymap__form-button[type=submit]').length).toEqual(1)
  })
  it('should have correct startging location value', () => {
    const googleMapAddress = { formatted_address: 'Fanling' }
    const setStartingLocation = vm.setStartingLocation(googleMapAddress)
    const formattedDropoffPoint = vm.setDropoffPoint(googleMapAddress)
    expect(vm.startingLocation).toEqual('Fanling')
    expect(vm.dropoffPoint).toEqual('Fanling')
  })
  it('should clean up content when form submitted', () => {
    vm.totalDistance = 20000
    vm.totalTime = 1800
    const setFormSubmit = vm.formSubmit()
    expect(vm.totalDistance).toEqual('')
    expect(vm.totalTime).toEqual('')
  })
  it('should not be called getToken when form submitted with empty input', () => {
    vm.startingLocation = ''
    vm.dropoffPoint = ''
    const setFormSubmitWithValue = vm.formSubmit()
    expect(vm.getToken).not.toBeCalled
  })
  it('should be called getToken when form submitted with necessary input', () => {
    vm.startingLocation = 'Kowloon bay'
    vm.dropoffPoint = 'Kowloon Tong'
    const setFormSubmitWithValue = vm.formSubmit()
    expect(vm.getToken).toBeCalled
  })
  it('should be retry getRoute max to 5 times', () => {
    vm.retryCounter = 6
    const setRetry = vm.getRoute('token-demo')
    expect(vm.message).toEqual('Server busy, please try again later')
  })
})
