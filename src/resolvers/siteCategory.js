/* eslint-disable no-return-await */
export default {
  Query: {
    siteCategorys: (parent, args, { models }) => {
      return Object.values(models.SiteCategory)
    },
    siteCategory: (parent, { id }, { models }) => {
      return Object.values(models.SiteCategory.id === id)
    }
  }
}
