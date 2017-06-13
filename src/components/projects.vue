<template lang="pug">
  #projects.flex-center.position-ref.full-height
    .content
      .title.m-b-md
        | Projects
      ul#projectlist
        li(v-for='project in projects')
          project-item(v-bind:item="project" v-bind:modal-size="modalSize")
</template>

<script>
  import Axios from 'axios'
  import toPx from 'unit-to-px'
  import projectItem from './projectItem.vue'

  export default {
    name: 'Projects',

    components: {
      projectItem
    },

    data () {
      return {
        projects: null
      }
    },

    computed: {
      modalSize () {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        let width
        let height = (toPx('vh') * 75)
        if (w > 400) {
          width = (toPx('vw') * 60)
        } else {
          width = (toPx('vw') * 85)
        }
        return {width, height}
      }
    },

    created () {
      Axios.get('https://api.github.com/users/pizzaandcoffee/repos')
        .then(result => {
          this.projects = result.data
        })
    }
  }
</script>
