<template lang="pug">
  div
    <!--a(v-bind:href='item.html_url', target='_blank') {{ item.name }}-->
    span(v-if="!infoShown" v-on:click="showinfo" ) {{ item.name }}
     div(v-if="infoShown")
       button(v-on:click="showinfo") Hide
       div(v-html="readme")
    <!--div(v-bind:class="{'is-active': showinfo, modal: true}")-->
      <!--.modal-background-->
      <!--.modal-content(v-html="readme")-->
      <!--button.modal-close(v-on:click="showinfo")-->

</template>

<script>
  import marked from 'marked'
  import Axios from 'axios'

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

    methods: {
      showinfo () {
        this.infoShown = !this.infoShown
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
