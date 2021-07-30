import { LoaderContext } from 'webpack'

function pageLoader(this: LoaderContext<{}>, content: string) {}

export default pageLoader
