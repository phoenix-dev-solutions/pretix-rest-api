'use strict';

const axios = require('axios');
const pjson = require('./package.json');

/**
 * Pretix REST API wrapper
 *
 * @param {Object} opt
 */
class PretixRestApi {
  /**
   * Class constructor.
   *
   * @param {Object} opt
   */
  constructor(opt) {
    if (!(this instanceof PretixRestApi)) {
      return new PretixRestApi(opt);
    }

    opt = opt || {};

    if (!opt.url) {
      throw new OptionsException('Url is required');
    }

    if (!opt.token) {
      throw new OptionsException('Token is required');
    }

    const parsedUrl = new URL(opt.url);
    if (parsedUrl.protocol != 'https:')
      throw new OptionsException('URL protocol must be https');

    this.classVersion = pjson.version;

    this._setDefaultsOptions({ opt });
  }
  /**
   * Set default options
   *
   * @param {Object} opt
   */

  _setDefaultsOptions({ opt }) {
    const parsedUrl = new URL(opt.url);
    this.version = opt.version || 'v1';
    this.url = `${parsedUrl.origin}/api/${this.version}/organizers/`;
    this.organizer = opt.organizer;
    this.token = opt.token;

    if (this.organizer) this.url += `${this.organizer}/`;

    //---------------------------------------------
    this.encoding = opt.encoding || 'utf8';
    this.timeout = opt.timeout;
    this.axiosConfig = opt.axiosConfig || {};
  }
  /**
   * Parse params object.
   *
   * @param {Object} params
   * @param {Object} query
   */

  _parseParamsObject({ params, query }) {
    for (const key in params) {
      const value = params[key];

      if (typeof value === 'object') {
        for (const prop in value) {
          const itemKey = key.toString() + '[' + prop.toString() + ']';
          query[itemKey] = value[prop];
        }
      } else {
        query[key] = value;
      }
    }

    return query;
  }

  /**
   * Get URL
   *
   * @param  {Object} params
   *
   * @return {String}
   */

  _getUrl({ endpoint, params = {} }) {
    return this.url + endpoint;
  }

  /**
   * Do requests
   *
   * @param  {String} method
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  _request({ method, endpoint, data, params = {} }) {
    const url = this._getUrl({ endpoint, params });

    let options = {
      url: url,
      method: method,
      responseEncoding: this.encoding,
      timeout: this.timeout || 30 * 1000,
      responseType: 'json',
      headers: {
        'User-Agent': 'Pretix REST API - JS Client/' + this.classVersion,
        Accept: 'application/json',
        Authorization: `Token ${this.token}`,
      },
    };

    options.params = { ...options.params, ...params };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.data = JSON.stringify(data);
    }

    options = { ...options, ...this.axiosConfig };

    console.log('options', options);

    return axios(options);
  }
  /**
   * GET requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {Object}
   */

  get({ endpoint, params = {} }) {
    return this._request({ method: 'get', endpoint, params });
  }

  /**
   * POST requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  post({ endpoint, data, params = {} }) {
    return this._request('post', endpoint, data, params);
  }

  /**
   * PUT requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  put({ endpoint, data, params = {} }) {
    return this._request('put', endpoint, data, params);
  }

  /**
   * PATCH requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  patch({ endpoint, data, params = {} }) {
    return this._request('patch', endpoint, data, params);
  }

  /**
   * DELETE requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {Object}
   */

  delete({ endpoint, params = {} }) {
    return this._request({ method: 'delete', endpoint, params });
  }
}
/**
 * Options Exception.
 */

module.exports = PretixRestApi;

class OptionsException {
  /**
   * Constructor.
   *
   * @param {String} message
   */
  constructor(message) {
    this.name = 'Options Error';
    this.message = message;
  }
}

exports.OptionsException = OptionsException;
