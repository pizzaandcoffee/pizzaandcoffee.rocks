<template lang="pug">
  div
    span(v-if="!infoShown" v-on:click="showinfo" ) {{ item.name }}
    div(v-if="infoShown")
      button(v-on:click="showinfo") Hide
      div(v-html="readme")
    modal(v-bind:name="item.name" v-bind:width="vw" v-bind:height="vh")
      .readme-modal
        span.close(v-on:click="hideinfo") X
        div.readme(v-html="readme")
</template>

<script>
  import marked from 'marked'
  import Axios from 'axios'
  import toPx from 'unit-to-px'

  export default {
    name: 'ProjectItem',

    props: [
      'item'
    ],

    created () {
      this.fetchReadmeData()
    },

    data () {
      return {
        readme: null,
        infoShown: false
      }
    },

    computed: {
      vw () {
        return (toPx('vw') * 60)
      },

      vh () {
        return (toPx('vh') * 75)
      }
    },

    methods: {
      showinfo () {
        this.$modal.show(this.item.name)
      },

      hideinfo () {
        this.$modal.hide(this.item.name)
      },

      fetchReadmeData () {
        Axios.get(`https://api.github.com/repos/pizzaandcoffee/${this.item.name}/readme`)
          .then(result => {
            this.readme = marked(window.atob(result.data.content))
          })
      }
    }
  }
</script>
