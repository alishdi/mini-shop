/**
 * @swagger
 *  components:
 *      schemas:
 *          getOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile phon FA-Ir
 *          checkOPT:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile phone FA-Ir
 *                  code:
 *                      type: integer
 *                      description: otp code

 */

/**
 * @swagger
 *  /auth/get-otp:
 *      post:
 *          tags: [authorization]
 *          summary: sen your phone number
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/getOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getOTP'
 *          responses:
 *              200:
 *                  description: success
 *          
 */


/**
 * @swagger
 *  /auth/check-otp:
 *      post:
 *          tags: [authorization]
 *          summary: sent your phone number & otp code
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOPT'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOPT'
 *          responses:
 *              200:
 *                  description: success
 *          
 */
