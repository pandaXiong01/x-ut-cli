import { shallowMount } from '@vue/test-utils'
import App from '../../../src/app';

describe('App.vue', () => {
  it('组件渲染正常', () => {
    const wrapper = shallowMount(App)
    expect(wrapper).toMatchSnapshot()
  })
});
