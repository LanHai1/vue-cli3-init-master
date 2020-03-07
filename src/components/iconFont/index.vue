<template>
  <svg class="svg-icon" :style="styles" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class IconSvg extends Vue {
  @Prop({
    type: String,
    required: true
  })
  private iconClass!: string;

  @Prop({
    type: Number,
    default: 18
  })
  private size!: number;

  @Prop({
    type: String,
    default: "currentColor"
  })
  private color!: string;

  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  private otherStyle!: object;

  private styles = {
    "font-size": this.size + "px",
    fill: this.color,
    ...this.otherStyle
  };
  get iconName() {
    return `#icon-${this.iconClass}`;
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>