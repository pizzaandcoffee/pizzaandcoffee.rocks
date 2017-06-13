<template>
  <div id="app">
    <landing></landing>
    <about></about>
    <projects></projects>
    <contact></contact>
  </div>
</template>

<script>
import Landing from './components/landing'
import About from './components/about'
import Projects from './components/projects'
import Contact from './components/contact'
import './styles/main.scss'
export default {
  name: 'MainComp',
  components: {
    Landing,
    About,
    Projects,
    Contact
  }
}
</script>
