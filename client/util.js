export const util = {}

Object.assign(util, {
  makeSlug: str => {
    // HACK: Would like to write /[^a-z]+/g but compiler screws up "^"
    return str.toLowerCase().replace(new RegExp('[\u005ea-z]+', 'g'), '-')
  }
})
