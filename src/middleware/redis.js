const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          `Success Get Product By Id ${id} with redis`,
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          const newResult = JSON.parse(result)
          return helper.response(
            response,
            200,
            'Success Get Product with redis',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          next()
        }
      }
    )
  },
  clearDataProductRedis: (requset, response, next) => {
    client.keys('getproduct*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
        next()
      } else {
        next()
      }
    })
  },
  getCouponRedis: (request, response, next) => {
    client.get('getcouponall', (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          'Success Get Coupon with redis',
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getCouponByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getcouponbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          `Success Get Coupon By Id ${id} with redis`,
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  clearDataCouponRedis: (requset, response, next) => {
    client.keys('getcoupon*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
        next()
      } else {
        next()
      }
    })
  }
}
