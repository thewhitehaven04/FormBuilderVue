function buildLink(relativePath: string) {
    return window.location.origin + relativePath
}

export { buildLink }