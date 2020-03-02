<template>
  <el-menu
    mode="vertical"
    unique-opened
    :default-active="$route.path"
    background-color="#FE9818"
    text-color="#fff"
    active-text-color="#FE9818"
    @select="handleSelect"
  >
    <sidebar-item :routes="routes"></sidebar-item>
  </el-menu>
</template>

<script>
import sidebarItem from "./sidebarItem";

export default {
  components: { sidebarItem },
  computed: {
    routes() {
      return global.antRouter;
    }
  },
  methods: {
    handleSelect() {
      console.log($(".el-menu-item.is-active").parent().parent().prev())
      console.log($(".el-menu-item.is-active").parent().parent().next())
    }
  }
};
</script>
