"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOneByName(ctx) {
    const { name } = ctx.params;
    const entity = await strapi.query("cryptos").findOne({ name: name });
    if (entity)
      return ctx.send({
        message: "Crypto found",
        success: true,
        crypto: sanitizeEntity(entity, { model: strapi.models.cryptos }),
      });

    return ctx.send({
      message: "Crypto not found",
      success: false,
    });
  },
};
