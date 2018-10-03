// -*- rjsx -*-

// routes.js
// A custom routing structure that is easy to maintain.
import {Welcome} from './pages/Welcome'

const routes = () => [
  {
    title: 'Welcome',
    to: '/',
    component: Welcome
  },
]

export { routes }
