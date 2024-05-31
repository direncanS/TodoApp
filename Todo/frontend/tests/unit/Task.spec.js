import { mount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

describe('Navbar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navbar, {
      data() {
        return {
          isAuthenticated: false, // Set the initial authentication state for testing
          userEmail: ''
        };
      }
    });
  });

  it('renders Navbar component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays "Todo App" ', () => {
    const userText = wrapper.find('.navbar-text');
    expect(userText.text()).toContain('Todo App');
  });

  it('displays "Home link" ', () => {
    const userText = wrapper.find('.navbar-brand');
    expect(userText.text()).toContain('Home');
  });
  it('renders email input', () => {
    const wrapper = mount(Login);
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);
  });
  it('renders password input', () => {
    const wrapper = mount(Login);
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);
  });

  it('renders login button', () => {
    const wrapper = mount(Login);
    const loginButton = wrapper.find('button.is-success');
    expect(loginButton.exists()).toBe(true);
  });
  it('applies Bulma form classes to email input', () => {
    const wrapper = mount(Login);
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.classes()).toContain('input');
  });

  it('applies Bulma form classes to password input', () => {
    const wrapper = mount(Login);
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.classes()).toContain('input');
  });

  it('applies Bulma form classes to login button', () => {
    const wrapper = mount(Login);
    const loginButton = wrapper.find('button.is-success');
    expect(loginButton.classes()).toContain('button');
    expect(loginButton.classes()).toContain('is-success');
  });

  // for registration form
  it('renders email input', () => {
    const wrapper = mount(Register);
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.exists()).toBe(true);
  });
  it('renders password input', () => {
    const wrapper = mount(Register);
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);
  });

  it('renders Register button', () => {
    const wrapper = mount(Register);
    const loginButton = wrapper.find('button.is-success');
    expect(loginButton.exists()).toBe(true);
  });
  it('applies Bulma form classes to email input', () => {
    const wrapper = mount(Register);
    const emailInput = wrapper.find('input[type="email"]');
    expect(emailInput.classes()).toContain('input');
  });

  it('applies Bulma form classes to password input', () => {
    const wrapper = mount(Register);
    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.classes()).toContain('input');
  });

  it('applies Bulma form classes to login button', () => {
    const wrapper = mount(Register);
    const RegisterButton = wrapper.find('button.is-success');
    expect(RegisterButton.classes()).toContain('button');
    expect(RegisterButton.classes()).toContain('is-success');
  });

});
