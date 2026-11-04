// 全局 page-container 栈管理
class PageContainerManager {
    private stack : number[] = []
    private idCounter : number = 0

    register() : number {
        const id = ++this.idCounter
        this.stack.push(id)
        return id
    }

    unregister(id : number) {
        const index = this.stack.indexOf(id)
        if (index > -1) {
            this.stack.splice(index, 1)
        }
    }

    isTop(id : number) : boolean {
        return this.stack.length > 0 && this.stack[this.stack.length - 1] == id
    }
}

export const pageContainerManager = new PageContainerManager()