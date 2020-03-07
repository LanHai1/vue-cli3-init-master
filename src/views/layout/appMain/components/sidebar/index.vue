<template>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#FE9818" text-color="#fff" active-text-color="#FE9818">
        <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
</template>

<script lang="ts">
import sidebarItem from "./sidebarItem.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { sidebarItem }
})
export default class Sidebar extends Vue {
    get routes(): any {
        return (this as any).$globals.antRouter
    }
}
</script>