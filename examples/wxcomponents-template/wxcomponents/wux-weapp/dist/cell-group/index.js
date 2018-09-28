Component({
    externalClasses: ['wux-class'],
    relations: {
        '../cell/index': {
            type: 'child',
            linked() {
                this.updateIsLastElement('../cell/index')
            },
            linkChanged() {
                this.updateIsLastElement('../cell/index')
            },
            unlinked() {
                this.updateIsLastElement('../cell/index')
            },
        },
    },
    properties: {
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
    },
    methods: {
        updateIsLastElement() {
            const elements = this.getRelationNodes('../cell/index')
            if (elements.length > 0) {
                const lastIndex = elements.length - 1
                elements.forEach((element, index) => {
                    element.updateIsLastElement(index === lastIndex)
                })
            }
        },
    },
})