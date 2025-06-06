type Experssion = {
    feature : string
    modifier : string
    value : string
}

type Values = {
    orientation ?: string
    width ?: number
    height ?: number
}

const RE_MQ_FEATURE = /^(min|max)?([A-Z]?[a-z]+)(?:([A-Z])([a-z]+))?$/;

export class UniMatchMediaElement extends UniViewElementImpl implements UniCustomElement {
    static get observedAttributes() : Array<string> {
        return [
            'orientation',
            'width',
            'minWidth',
            'maxWidth',
            'height',
            'minHeight',
            'maxHeight',
        ]
    }

    private _experssions : Array<Experssion> = []

    constructor() {
        super()

        this.uniPage.vm!.$.$waitNativeRender(() => {
            this.toggleElement(this.isValid({
                width: this.uniPage.pageBody.width,
                height: this.uniPage.pageBody.height,
                orientation: uni.getDeviceInfo().deviceOrientation
            }))
		})

        onResize((res : OnResizeOptions) => {
            this.toggleElement(this.isValid({
                orientation: res.deviceOrientation,
                width: res.size.windowWidth,
                height: res.size.windowHeight
            }))
		}, this.uniPage.vm!.$)
    }

    override connectedCallback() {
        this._experssions = this.getExpressions();
    }

    override attributeChangedCallback(name : string, oldValue : string, newValue : string) {
        if (this._experssions.length == 0) {
            return
        }

        const matches = name.match(RE_MQ_FEATURE);
        if (matches == null || matches.length == 0) {
            return
        }
        const modifier = matches[1] != null ? matches[1]! : ''
        const feature = matches[2] != null ? matches[2]!.toLowerCase() : ''
        const expression = this._experssions.find((expr) => expr.feature == feature && expr.modifier == modifier)
        if (expression == null) {
            return
        }

        expression.value = newValue
        this.toggleElement(this.isValid({
            width: this.uniPage.pageBody.width,
            height: this.uniPage.pageBody.height,
            orientation: uni.getDeviceInfo().deviceOrientation
        }))
    }

    private getExpressions() {
        const expressions : Array<Experssion> = [];
        UniMatchMediaElement.observedAttributes.forEach((key) => {
            const value = this.getAttribute(key);
            const feature = key.match(RE_MQ_FEATURE);
            if (value != null && feature != null && feature.length > 0) {
                expressions.push({
                    modifier: feature[1] != null ? feature[1]! : '',
                    feature: feature[2] != null ? feature[2]!.toLowerCase() : '',
                    value
                });
            }
        })
        return expressions
    }

    // 显示或者隐藏页面元素
    private toggleElement(show : boolean) {
        this.style.setProperty('display', show ? 'flex' : 'none')
    }

    private isValid(values : Values) {
        return this._experssions.every((expression) => {
            switch (expression.feature) {
                case 'orientation':
                    return values[expression.feature] === this.getAttribute(expression.feature)
                case 'width':
                case 'height':
                    break
            }

            const expressionValue = values[expression.feature] as number
            switch (expression.modifier) {
                case 'min': return parseFloat(expression.value) <= expressionValue;
                case 'max': return parseFloat(expression.value) >= expressionValue;
                default: return parseFloat(expression.value) === expressionValue;
            }
        })
    }

}