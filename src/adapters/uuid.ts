import { v1, v4 } from 'uuid'

export class IAdapterUuid {
  private uuid

  constructor(version: 'v1' | 'v4') {
    const versions = {
      v1,
      v4,
    }

    this.uuid = versions[version]
  }

  makeToken() {
    return this.uuid()
  }
}
