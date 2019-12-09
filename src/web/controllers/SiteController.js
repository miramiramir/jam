class SiteController {
  /**
   * Renders the index page
   * @param {Request} request Http request
   * @param {Response} response Http response
   * @returns {Response}
   * @public
   */
  static index(request, response) {
    return response.render('index');
  }
}

module.exports = SiteController;
