import { Configuration } from 'webpack'
import { define } from './define'
import { banner } from './banner'
import { provide } from './provide'
export const plugins: Configuration['plugins'] = [define, banner, provide]
