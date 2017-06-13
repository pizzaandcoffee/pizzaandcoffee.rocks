<template lang="pug">
  .canvas-interactive-wrapper
    canvas#canvas-interactive
    .flex-center.position-ref.full-height
      octocat
      .content
        .title.m-b-md
          | Pizza and Coffee Studios
        .links
          a.link(v-scroll-to="'#about'") About
          a.link(v-scroll-to="'#projects'") Projects
          a.link(v-scroll-to="'#contact'") Contact
</template>

<script>
  import Octocat from './octocat'
  let Granim = require('granim')

  export default {
    name: 'Landing',

    components: {
      Octocat
    },

    mounted () {
      /* eslint-disable no-new */
      new Granim({
        element: '#canvas-interactive',
        name: 'interactive-gradient',
        elToSetClassOn: '.canvas-interactive-wrapper',
        direction: 'diagonal',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        stateTransitionSpeed: 500,
        states: {
          'default-state': {
            gradients: [
              ['#B3FFAB', '#12FFF7'],
              ['#ADD100', '#7B920A'],
              ['#1A2980', '#26D0CE']
            ],
            transitionSpeed: 10000
          }
        }
      })
    }
  }
</script>

<style>.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {
  0%, 100% {
    transform: rotate(0)
  }
  20%, 60% {
    transform: rotate(-25deg)
  }
  40%, 80% {
    transform: rotate(10deg)
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }
}</style>
