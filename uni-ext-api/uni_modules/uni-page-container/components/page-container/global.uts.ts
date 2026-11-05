// #ifdef !VUE3-VAPOR && APP-ANDROID
import PageNode from "io.dcloud.uniapp.dom.node.PageNode";
import INodeData from "io.dcloud.uniapp.interfaces.INodeData";
// #endif

export class UniPageContainerElement extends UniViewElementImpl {
	// #ifdef !VUE3-VAPOR && APP-ANDROID
	constructor(data : INodeData, pageNode : PageNode) {
		super(data, pageNode);
	}
	// #endif
}