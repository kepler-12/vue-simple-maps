import { mount } from '@vue/test-utils'
import Map from './Map'

describe('Google Maps Component', () => {
  const wrapper = mount(Map)

  test('renders a Google Map', () => {
    console.log(wrapper.html())
    expect(wrapper.contains('.gm-style')).toBeTruthy()
  })
})
