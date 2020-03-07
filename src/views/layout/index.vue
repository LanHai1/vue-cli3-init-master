<template>
    <div class="app-wrapper">
        <main class="main">
            <sidebar class="sidebar-container"></sidebar>
            <div class="main-container">
                <headerbar></headerbar>
                <app-main></app-main>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import AppMain from "./appMain/appMain.vue"; //页面布局的右侧区域
import sidebar from "./appMain/components/sidebar/index.vue"; //页面布局的左侧菜单
import headerbar from "./appMain/components/header/index.vue"; //页面布局的顶部区域

import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {  AppMain,
        headerbar,
        sidebar }
})
export default class Layout extends Vue {}
</script>

<style scoped lang="scss">
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, #fff, #F5F6F9);
    .main {
        width: 100%;
        height: 100%;
        display: flex;
        min-height: 100vh;
        ::v-deep .header {
            height: 40px;
            background-color: red;
            display: grid;
        }
    }
}
</style>
