<template>
  <div>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      show-checkbox
      draggable
      ref="tree"
      :expand-on-click-node="false"
      :default-checked-keys="['1-1']"
      @node-drag-enter="handleDragEnter"
      @check="checked"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <icon-svg :icon-class="data.meta.icon | GetOfString" class="icon_location" />
          {{ data.meta.title }}
        </span>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
          <el-button type="text" size="mini" @click="() => update(data)">Update</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  filters: {
    GetOfString(value: any) {
      if (!value) return "";
      return value.replace(/"/g, "");
    }
  }
})
export default class Tree extends Vue {
  public id = 1000;
  public fakeRouter = {
    router: [
      {
        path: "",
        component: "Layout",
        redirect: "dashboard",
        id: "1",
        meta: {
          title: "首页",
          icon: "shouye"
        },
        children: [
          {
            path: "dashboard",
            component: "homePage/index",
            id: "1-1",
            meta: {
              title: "首页",
              icon: "shouye"
            }
          }
        ]
      },
      {
        path: "/a",
        component: "Layout",
        redirect: "dashboard1",
        id: "2",
        meta: {
          title: "测试",
          icon: "mingxinghuodong"
        },
        children: [
          {
            path: "dashboard1",
            component: "homePage/index",
            id: "2-1",
            meta: {
              title: "测试",
              icon: "mingxinghuodong"
            }
          }
        ]
      },
      {
        path: "/example",
        component: "Layout",
        redirect: "/example/icon",
        name: "Example",
        id: "3",
        meta: {
          title: "组件",
          icon: "fuzhi"
        },
        children: [
          {
            path: "icon",
            name: "Icon",
            component: "icon/index",
            id: "3-1",
            meta: {
              title: "iconfont",
              icon: "weixuanzhong"
            }
          },
          {
            path: "tree",
            name: "Tree",
            component: "tree/index",
            id: "3-2",
            meta: {
              title: "树形菜单",
              icon: "guanzhu"
            }
          }
        ]
      }
    ]
  };

  public data = JSON.parse(JSON.stringify(this.fakeRouter)).router;

  public append(data: any) {
    const newChild = { id: this.id++, label: "testtest", children: [] };
    if (!data.children) {
      this.$set(data, "children", []);
    }
    data.children.push(newChild);
  }
  public remove(node: any, data: any) {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex((d: any) => d.id === data.id);
    children.splice(index, 1);
  }
  public update(data: any) {
    console.log(data);
  }
  public handleDragEnter(draggingNode: any, dropNode: any, ev: any) {
    console.log("tree drag enter: ", dropNode.label, ev);
  }
  public checked(v: any) {
    console.log(v);
    console.log((this.$refs.tree as any).getCheckedKeys(false));
    console.log((this.$refs.tree as any).getCheckedNodes());
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  text-align: left;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .icon_location {
    position: relative;
    top: 4px;
  }
}
</style>