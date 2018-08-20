<template>
  <!--判断是否是标签节点-->
  <block v-if="node.node == 'element'">
    <block v-if="node.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(node, index) of node.nodes" :key="index">
          <wx-parse-template :node="node" />
        </block>
      </button>
    </block>

    <!--li类型-->
    <block v-else-if="node.tag == 'li'">
      <view :class="node.classStr" :style="node.styleStr">
        <block v-for="(node, index) of node.nodes" :key="index">
          <wx-parse-template :node="node" />
        </block>
      </view>
    </block>

    <!--video类型-->
    <block v-else-if="node.tag == 'video'">
      <wx-parse-video :node="node" />
    </block>

    <!--audio类型-->
    <block v-else-if="node.tag == 'audio'">
      <wx-parse-audio :node="node" />
    </block>

    <!--img类型-->
    <block v-else-if="node.tag == 'img'">
      <wx-parse-img :node="node" />
    </block>

    <!--a类型-->
    <block v-else-if="node.tag == 'a'">
      <view @click="wxParseATap" :class="node.classStr" :data-href="node.attr.href" :style="node.styleStr">
        <block v-for="(node, index) of node.nodes" :key="index">
          <wx-parse-template :node="node" />
        </block>
      </view>
    </block>

    <!--br类型-->
    <block v-else-if="node.tag == 'br'">
      <text>\n</text>
    </block>

    <!--其他标签-->
    <block v-else>
      <view :class="node.classStr" :style="node.styleStr">
        <block v-for="(node, index) of node.nodes" :key="index">
          <wx-parse-template :node="node" />
        </block>
      </view>
    </block>

  </block>

  <!--判断是否是文本节点-->
  <block v-else-if="node.node == 'text'">{{node.text}}</block>
</template>

<script>
import wxParseTemplate from './wxParseTemplate7';
import wxParseImg from './wxParseImg';
import wxParseVideo from './wxParseVideo';
import wxParseAudio from './wxParseAudio';

export default {
  name: 'wxParseTemplate6',
  props: {
    node: {},
  },
  components: {
    wxParseTemplate,
    wxParseImg,
    wxParseVideo,
    wxParseAudio,
  },
  methods: {
    wxParseATap(e) {
      const { href } = e.target.dataset;
      if (!href) return;
      this.node.$host.navigate(href, e);
    },
  },
};
</script>
