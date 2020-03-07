<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <ul class="buttons">
      <li>下载</li>
      <li>
        <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN diagram</a>
      </li>
      <li>
        <a ref="saveSvg" href="javascript:" title="download as SVG image">SVG image</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// 引入相关的依赖
import BpmnModeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
// 颜色
import prioritiesModule from "bpmn-js-task-priorities/lib/priorities";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ShowBpmn extends Vue {
  // bpmn建模器
  public bpmnModeler = null;
  public container = null;
  public canvas = null;
  public xmlStr = null;
  public processName = "";

  /**
   * createNewDiagram
   */
  public createNewDiagram() {
    const bpmnXmlStr =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
      '  <bpmn2:process id="Process_1" isExecutable="false">\n' +
      '    <bpmn2:startEvent id="StartEvent_1"/>\n' +
      "  </bpmn2:process>\n" +
      '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
      '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
      '        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0" />\n' +
      "      </bpmndi:BPMNShape>\n" +
      "    </bpmndi:BPMNPlane>\n" +
      "  </bpmndi:BPMNDiagram>\n" +
      "</bpmn2:definitions>";
    // 将字符串转换成图显示出来
    (this.bpmnModeler as any).importXML(bpmnXmlStr, function(err: any) {
      if (err) {
        console.error(err);
      }
    });
  }
  /**
   * saveSVG
   * 下载为SVG格式,done是个函数，调用的时候传入的
   */
  public saveSVG(done: any) {
    // 把传入的done再传给bpmn原型的saveSVG函数调用
    (this.bpmnModeler as any).saveSVG(done);
  }
  /**
   * saveDiagram
   * 下载为SVG格式,done是个函数，调用的时候传入的
   */
  public saveDiagram(done: any) {
    // 把传入的done再传给bpmn原型的saveXML函数调用
    (this.bpmnModeler as any).saveXML({ format: true }, function(
      err: any,
      xml: any
    ) {
      done(err, xml);
    });
  }
  /**
   * setEncoded
   * 当图发生改变的时候会调用这个函数，这个data就是图的xml
   */
  public setEncoded(link: any, name: any, data: any) {
    // 把xml转换为URI，下载要用到的
    const encodedData = encodeURIComponent(data);
    // 获取到图的xml，保存就是把这个xml提交给后台
    this.xmlStr = data;
    // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
    if (data) {
      link.className = "active";
      link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
      link.download = name;
    }
  }
  public mounted() {
    // 获取到属性ref为“content”的dom节点
    (this as any).container = this.$refs.content;
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas;

    // 建模，官方文档这里讲的很详细
    const BpmnModelers: any = BpmnModeler;
    this.bpmnModeler = new BpmnModelers({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule,
        // 颜色
        prioritiesModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    // 下载画图
    const _this = (this as any);
    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram;
    const downloadSvgLink = this.$refs.saveSvg;
    // 给图绑定事件，当图有发生改变就会触发这个事件
    (this as any).bpmnModeler.on("commandStack.changed", function() {
      _this.saveSVG(function(err: any, svg: any) {
        _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
      });

      _this.saveDiagram(function(err: any, xml: any) {
        _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
      });
    });

    this.createNewDiagram();
  }
}
</script>

<style lang="scss">
/*左边工具栏以及编辑节点的样式*/
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
/*右边工具栏样式*/
@import "~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
.containers {
  position: relative;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  min-height: 780px !important;
}
.canvas {
  width: 100%;
  height: 780px !important;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 780px;
  overflow-y: scroll;
}
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
  & > li {
    display: inline-block;
    margin: 5px;
    & > a {
      color: #999;
      background: #eee;
      cursor: not-allowed;
      padding: 8px;
      border: 1px solid #ccc;
      &.active {
        color: #333;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>