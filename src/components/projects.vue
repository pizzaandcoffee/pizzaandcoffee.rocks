<template lang="pug">
  #projects.flex-center.position-ref.full-height
    .content
      .title.m-b-md
        | Projects
      ul#projectlist
        li(v-for='project in projects')
          project-item(v-bind:item="project")
</template>

<script>
  import Axios from 'axios'
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

    created () {
      Axios.get('https://api.github.com/users/pizzaandcoffee/repos')
        .then(result => {
          this.projects = result.data
        })
    }
  }
</script>
