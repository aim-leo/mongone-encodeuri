const { object, integer, array, string, any, id, at } = require('tegund')

const selectInterface = object({
  override: any().optional(),
  exclude: array(string()).optional(),
  include: array(string()).optional()
})

const populateInterface = object({
  override: any().optional(),
  exclude: array(string()).optional(),
  include: at(
    array(object({ path: string(), select: string().optional() })),
    array(string())
  ).optional()
})

const searchFieldInterface = object({
  value: string().convert().min(1),
  scope: array('string').min(1)
})

const searchInterface = object({
  search: searchFieldInterface.clone().optional(),
  populate: populateInterface.clone().optional(),
  select: selectInterface.clone().optional(),

  filter: object().optional(),
  sort: object().optional(),
  limit: integer().convert().min(0).optional(), // if limit is 0, query all doc
  page: integer().convert().min(1).optional(),
  id: id().optional()
})

module.exports = {
  selectInterface,
  populateInterface,
  searchInterface,
  searchFieldInterface
}
