<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in routes">
      <div v-if="!item.hidden&&item.children" :key="index">
        <router-link
          v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
          :to="item.path+'/'+item.children[0].path"
          :key="item.children[0].name"
        >
          <el-menu-item
            :index="item.path+'/'+item.children[0].path"
            :class="{'submenu-title-noDropdown':!isNest}"
          >
            <i :class="item.children[0].meta.icon"></i>
            <!-- {{item.children[0].meta.icon}} -->
            <span
              v-if="item.children[0].meta&&item.children[0].meta.title"
            >{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name||item.path" :key="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <!-- {{item.meta.icon}} -->
            <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </template>

          <template v-for="(child,index) in item.children">
            <div v-if="!child.hidden" :key="index">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children&&child.children.length>0"
                :routes="[child]"
                :key="child.path"
              ></sidebar-item>

              <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path">
                  <i :class="child.meta.icon"></i>
                  <!-- {{child.meta.icon}} -->
                  <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                </el-menu-item>
              </router-link>
            </div>
          </template>
        </el-submenu>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "sidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
</style