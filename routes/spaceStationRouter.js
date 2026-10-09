const express = require("express");
const { currentLocation, allPositionFromLastOneHour, timeWhenIssIsCloseToSpecifiedLoc, distanceToSpecifiedLoc, getSpeedOfISS } = require("../controllers/spaceStationController");
const sendJson = require("../helpers/sendJson");
const router = express.Router();

router.route('/current')
    .get(async (req,res) => {
        const data = await currentLocation(req,res)
        sendJson(res, data)
    })

router.route('/path')
    .get(async (req, res) => {
        const data = await allPositionFromLastOneHour(req, res)
        sendJson(res, data)
    })

router.route('/distance')
    .get(async (req, res) => {
        const data = await distanceToSpecifiedLoc(req, res)
        sendJson(res, data)
    })

router.route('/closest')
    .get(async (req, res) => {
        const data = await timeWhenIssIsCloseToSpecifiedLoc(req, res)
        sendJson(res, data)
    })

router.route('/speed')
    .get(async (req, res) => {
        const data = await getSpeedOfISS(req, res)
        sendJson(res, data)
    })


module.exports = router