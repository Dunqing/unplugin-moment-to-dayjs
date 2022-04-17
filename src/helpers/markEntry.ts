export default function makeEntry(entry: any, initEntry: string) {
  if (typeof entry === 'object' && !Array.isArray(entry)) {
    Object.keys(entry).forEach((e) => {
      (entry as any)[e] = makeEntry((entry as any)[e], initEntry)
    })
    return entry
  }
  if (typeof entry === 'string')
    return [initEntry, entry]

  if (Array.isArray(entry))
    return [initEntry].concat(entry)

  if (typeof entry === 'function') {
    return async() => {
      const originalEntry = await entry()
      return makeEntry(originalEntry, initEntry)
    }
  }

  return entry
}
