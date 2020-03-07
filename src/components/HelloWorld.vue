<template>
  <div class="hello">
    1
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { testHttp } from "../api/http/testNew";
@Component
export default class HelloWorld extends Vue {
  one = 1;

  @Prop() private msg!: string;

  public mounted() {
    this.getEl();
    this.getScore()
  }
  public getEl() {
    console.log($(".hello"));
  }
  private getScore() {
    // testHttp({
    //   fnRes: (res: any) => {
    //     console.log("res", res);
    //   }
    // });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
