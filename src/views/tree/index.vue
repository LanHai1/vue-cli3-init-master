<template>
  <div>
    <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span><icon-svg :icon-class='data.meta.icon.replace(/\"/g, "")' />{{ data.meta.title }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
          <el-button type="text" size="mini" @click="() => update(data)">Update</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;

let fakeRouter = {
  router: [
    {
      path: "",
      component: "Layout",
      redirect: "dashboard",
      meta: {
        title: "首页",
        icon: "shouye"
      },
      children: [
        {
          path: "dashboard",
          component: "homePage/index",
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
      meta: {
        title: "测试",
        icon: "mingxinghuodong"
      },
      children: [
        {
          path: "dashboard1",
          component: "homePage/index",
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
      meta: {
        title: "组件",
        icon: "fuzhi"
      },
      children: [
        {
          path: "icon",
          name: "Icon",
          component: "icon/index",
          meta: {
            title: "iconfont",
            icon: "weixuanzhong"
          }
        },
        {
          path: "tree",
          name: "Tree",
          component: "tree/index",
          meta: {
            title: "树形菜单",
            icon: "guanzhu"
          }
        }
      ]
    }
  ]
};

export default {
  name: "tree",
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 8,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      data: JSON.parse(JSON.stringify(fakeRouter)).router
    };
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    update(data) {
      console.log(data);
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  text-align: left;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>