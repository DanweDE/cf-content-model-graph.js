const { reduce, map, uniq } = require('lodash')
const minimist = require('minimist')
const csv = require('csvtojson')
const dot = require('./dotHelpers')

const DEFAULT_CSV_PATH = './input.csv'

const args = minimist(process.argv.slice(2), {
  default: {
    file: DEFAULT_CSV_PATH
  }
})
const csvFile = args.file

csv()
  .fromFile(csvFile)
  .then(jsonObj => {
    console.log(buildGraphDOT(jsonObj))
  }, (e) => {
    const additionalHelp = csvFile === DEFAULT_CSV_PATH ? 'Use --file parameter to specify a .csv file path.' : ''
    console.error(`Error: ${e.message} ${additionalHelp}`.trim())
  })

/**
 *
 * @param {Array<Object>} relations Example:
 * [{ parent_ct_name, parent_ct_id, child_ct_name, child_ct_id }, ...]
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
