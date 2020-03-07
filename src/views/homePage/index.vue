<template>
  <div class="app-container">
    我是主页
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class AppIndex extends Vue {}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>