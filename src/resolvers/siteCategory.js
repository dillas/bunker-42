export default {
  Query: {
    siteCategorys: (parent, args, { models }) => {
      return models.SiteCategory
    },
    siteCategory: (parent, { id }, { models }) => {
      return models.SiteCategory.find(item => item.id === id)
    }
  }
}
