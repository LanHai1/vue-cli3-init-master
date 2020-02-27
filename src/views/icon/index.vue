<template>
  <ul class="icon_ul">
    <li v-for="item in icons" :key="item" @click="copeText(item)">
      <div class="icon_svg">
        <icon-svg :icon-class="item" :size="30" />
      </div>
      <p class="title">{{item.replace(/\"/g, "")}}</p>
    </li>
  </ul>
</template>

<script>
let url = require("assets/icon/iconfont.svg");

function getText(url) {
  let promise = new Promise(function(resolve, reject) {
    let client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "text";
    client.setRequestHeader("Accept", "text/plan");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
  });
  return promise;
}

import { cope } from "utils/cope.js";

export default {
  name: "icon",
  data() {
    return {
      icons: []
    };
  },
  mounted() {
    getText(url).then(data => {
      let txt = data;
      if (!txt || txt === "") return;
      let iconArr = txt.match(/glyph-name="(\S*)/gm);
      iconArr.forEach(v => {
        this.icons.push(v.split("=")[1].replace("\"","").replace("\"",""));
      });
    });
  },
  methods: {
    copeText(txt) {
      cope(txt.replace("\"","").replace("\"",""));
    }
  }
};
</script>

<style scoped lang="scss">
.icon_ul {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  li {
    width: 5%;
    background-color: #f9f9f9;
    border: 1px solid #fff;
    padding: 20px 0 10px;
    text-align: center;
    flex: auto;
    cursor: pointer;
    position: relative;
    .icon_svg {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .title {
      display: block;
      text-align: center;
      word-wrap: break-word;
      margin-top: 10px;
      font-size: 12px;
    }
    &:hover {
      color: #fff;
      background-color: #427cf3;
    }
  }
}
</style>