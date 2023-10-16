<template>
  <uni-cloud-db-element>
    123123123
  </uni-cloud-db-element>
</template>

<script lang="ts">
class UniCloudDBElement extends UniViewElement {
  constructor(data: INodeData, pageNode: PageNode) {
    super(data, pageNode)
  }
  test(): string {
    return "test"
  }
}
export default {
  name: 'UniCloudDB',
  rootElement: {
    name: "uni-cloud-db-element",
    class: UniCloudDBElement
  }
}
</script>
