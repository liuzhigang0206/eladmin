<template>
  <div>
    <svg-icon icon-class="github1" @click="click" />
  </div>
</template>

<script>
export default {
  name: 'xxx',
  methods: {
    click() {
      window.open('https://github.com/elunez/eladmin', '_blank')
    }
  }
}
</script>
