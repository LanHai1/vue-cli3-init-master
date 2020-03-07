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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cope } from "@/utils/cope";

@Component
export default class Icon extends Vue {
  private url = require("assets/icon/iconfont.svg");
  private icons = [];

  public getText(url: string) {
    const promise = new Promise(function(resolve, reject) {
      function handler(this: any) {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      }

      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "text";
      client.setRequestHeader("Accept", "text/plan");
      client.send();
    });
    return promise;
  }

  public copeText(txt: string) {
    cope(txt.replace('"', "").replace('"', ""));
  }

  public mounted() {
    this.getText(this.url).then(data => {
      const txt: any = data;
      if (!txt || txt === "") return;
      const iconArr = txt.match(/glyph-name="(\S*)/gm);
      iconArr.forEach((v: any) => {
        (this.icons as any).push(
          v
            .split("=")[1]
            .replace('"', "")
            .replace('"', "")
        );
      });
    });
  }
}
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