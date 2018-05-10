import { shallow } from '@vue/test-utils'
import Wow from './wow'

describe('Wow', () => {
  test('is a Vue instance', () => {
    const wrapper = shallow(Wow)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
