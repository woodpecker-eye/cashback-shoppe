var express = require('express');
var router = express.Router();
const { query, validationResult, check } = require('express-validator')
const shopeeService = require("../services/get_link")
const lodash = require("lodash")

/* GET home page. */
router.get('/get_link', [
    query("url")
        .exists()
        .isURL()
        .withMessage('url is invalid format'),
    query("sub_id")
        .default("mucuasut")
        .exists()
        .isString()
        .withMessage('sub_id is invalid format'),
], async function (req, res, next) {
    const { url, sub_id } = req.query
    let linkData = await shopeeService.getLink(url, sub_id)

    if (lodash.has(linkData, "data.batchCustomLink") === false) {
        return res.json({
            success: false,
            message: "Not Found"
        })
    }

    if (lodash.isArray(linkData.data.batchCustomLink) === false) {
        return res.json({
            success: false,
            message: "Not Found"
        })
    }

    let data = linkData.data.batchCustomLink[0]
    return res.json({
        success: true,
        ...data
    })
});

module.exports = router;
