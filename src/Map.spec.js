import { shallow } from '@vue/test-utils'
import Map from './Map'

describe('Google Maps Component', () => {
  const wrapper = shallow(Map)

  test('renders a Google Map', () => {
    console.log(wrapper)
    expect(wrapper.contains('.gm-style')).toBeTruthy()
  })
})
