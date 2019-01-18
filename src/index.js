const { reduce, map, uniq } = require('lodash')
const csv = require('csvtojson')
const dot = require('./dotHelpers')

const CSV_FILE = './input.csv'

csv()
  .fromFile(CSV_FILE)
  .then(jsonObj => {
    console.log(buildGraphDOT(jsonObj))
  })

/**
 *
 * @param {Array<Object>} relations, array of:
 * { parent_ct_name, parent_ct_id, child_ct_name, child_ct_id }
 * @returns {string}
 */
function buildGraphDOT (relations) {
  const contentTypes = reduce(relations, (contentTypes, relation) => {
    contentTypes[relation.parent_ct_id] = { name: relation.parent_ct_name }
    contentTypes[relation.child_ct_id] = { name: relation.child_ct_name }
    return contentTypes
  }, {})

  const dotNodes = map(contentTypes, ({ name }, id) => {
    return `${dot.id(id)} [label=${dot.label(name)}]`
  })
  const dotEdges = uniq(map(relations, ({ parent_ct_id, child_ct_id }) => {
    return `${dot.id(parent_ct_id)} -> ${dot.id(child_ct_id)}`
  }))
  const dotAll = `${dotNodes.join('\n')}\n\n${dotEdges.join('\n')}`

  return dot.digraph(dotAll)
}

function newlines (arr) {
  return arr.join('\n')
}
