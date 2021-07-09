import WebView from '../../../components/web-view'

import { UniComponent } from './UniComponent'

export class UniWebView extends UniComponent {
  constructor(id: number) {
    super(id, 'uni-web-view', WebView)
  }
}
