import os from 'os'
import { AddressInfo, Server } from 'net'
import chalk from 'chalk'
import { Logger, ResolvedConfig } from 'vite'
export function printHttpServerUrls(
  server: Server,
  config: ResolvedConfig
): void {
  const address = server.address()
  const isAddressInfo = (x: any): x is AddressInfo => x?.address
  if (isAddressInfo(address)) {
    const hostname = resolveHostname(true /*config.server.host*/)
    const protocol = config.server.https ? 'https' : 'http'
    printServerUrls(
      hostname,
      protocol,
      address.port,
      config.base,
      config.logger.info
    )
  }
}

function printServerUrls(
  hostname: Hostname,
  protocol: string,
  port: number,
  base: string,
  info: Logger['info']
): void {
  if (hostname.host === '127.0.0.1') {
    const url = `${protocol}://${hostname.name}:${chalk.bold(port)}${base}`
    info(`  > Local: ${chalk.cyan(url)}`)
    if (hostname.name !== '127.0.0.1') {
      info(`  > Network: ${chalk.dim('use `--host` to expose')}`)
    }
  } else {
    Object.values(os.networkInterfaces())
      .flatMap((nInterface) => nInterface ?? [])
      .filter((detail) => detail && detail.address && detail.family === 'IPv4')
      .map((detail) => {
        const type = detail.address.includes('127.0.0.1')
          ? 'Local:   '
          : 'Network: '
        const host = detail.address.replace('127.0.0.1', hostname.name)
        const url = `${protocol}://${host}:${chalk.bold(port)}${base}`
        return `  > ${type} ${chalk.cyan(url)}`
      })
      .forEach((msg) => info(msg))
  }
}

export interface Hostname {
  // undefined sets the default behaviour of server.listen
  host: string | undefined
  // resolve to localhost when possible
  name: string
}

export function resolveHostname(
  optionsHost: string | boolean | undefined
): Hostname {
  let host: string | undefined
  if (
    optionsHost === undefined ||
    optionsHost === false ||
    optionsHost === 'localhost'
  ) {
    // Use a secure default
    host = '127.0.0.1'
  } else if (optionsHost === true) {
    // If passed --host in the CLI without arguments
    host = undefined // undefined typically means 0.0.0.0 or :: (listen on all IPs)
  } else {
    host = optionsHost
  }

  // Set host name to localhost when possible, unless the user explicitly asked for '127.0.0.1'
  const name =
    (optionsHost !== '127.0.0.1' && host === '127.0.0.1') ||
    host === '0.0.0.0' ||
    host === '::' ||
    host === undefined
      ? 'localhost'
      : host

  return { host, name }
}
