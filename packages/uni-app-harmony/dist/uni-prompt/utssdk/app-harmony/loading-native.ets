import { UIContext, ComponentContent } from '@kit.ArkUI';

@Component
struct Loading {
    @Prop title: string

    build() {
        Column() {
            LoadingProgress()
                .width('38vp')
                .height('38vp')
                .margin('8vp')
                .color(Color.White)
            if (this.title) {
                Text(this.title)
                    .fontColor(Color.White)
                    .fontSize('14vp')
                    .maxLines(2)
                    .textAlign(TextAlign.Center)
                    .padding({
                        left: '8vp',
                        right: '8vp'
                    })
            }
        }
    .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Center)
            .width('120vp')
            .height('120vp')
            .backgroundColor('#ff4c4c4c')
            .borderRadius('5vp')
    }
}

interface LoadingOptions {
    title: string
}

@Builder
function LoadingBuilder(options: LoadingOptions) {
    Loading({
        title: options.title
    })
}

const loadings: ComponentContent<Loading>[] = []

export interface ShowLoadingOptions {
    title?: string,
    mask?: boolean
}

export function showLoading(uiContext: UIContext, options: ShowLoadingOptions) {
    const promptAction = uiContext.getPromptAction()
    const loading = new ComponentContent(
        uiContext,
        wrapBuilder(LoadingBuilder),
        {
            title: options.title || ''
        } as LoadingOptions
    )
    loadings.push(loading)
    promptAction.openCustomDialog(loading, {
        alignment: DialogAlignment.Center,
        isModal: options.mask == undefined ? false : options.mask,
        autoCancel: false,
        onWillDismiss: () => {

        }
    })
}

export function hideLoading(uiContext: UIContext) {
    const promptAction = uiContext.getPromptAction()
    loadings.forEach((loading) => {
        promptAction.closeCustomDialog(loading)
    })
}
