const express = require('express');
const MeetupsServices = require('../services/meetups');
const MeetupsUserServices = require('../services/meetupUser.js');
const cacheResponse = require('./../utils/cacheResponse');
const { 
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time.js');

function meetupsApi(app) {
    const router = express.Router();
    app.use("/api/meetups", router);

    const meetupsServices = new MeetupsServices();
    const meetupsUserServices = new MeetupsUserServices();

    router.get("/", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        
        try {
            const meetups = await meetupsServices.getMeetups({ tags });
            res.status(200).json({
                datos: meetups,
                message: 'Meetups listed'
            });
        } catch (error) {
            next(error);
        }
    })

    router.get("/:id", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { id } = req.params;
        
        try {
            const meetup = await meetupsServices.getMeetup({ id });
            res.status(200).json({
                datos: meetup,
                message: 'Meetup retrieved'
            });
        } catch (error) {
            next(error);
        }
    })

    router.get("/user/:id", async function (req, res, next) {
        const { id } = req.params;

        try {
            const meetupsUser = await meetupsUserServices.getMeetupsUser({ id });
            res.status(200).json({
                datos: meetupsUser,
                message: 'Meetups retrieved'
            });
        } catch (error) {
            next(error);
        }
    })

    router.post("/", async function (req, res, next) {
        const { body: meetup } = req; // { body: meetup } crea un alias 'meetup'
        
        try {
            const createdMeetupId = await meetupsServices.createMeetup({ meetup });
            res.status(201).json({
                datos: createdMeetupId,
                message: 'Meetup created'
            });
        } catch (error) {
            next(error);
        }
    })

    router.put("/:id", async function (req, res, next) {
        const { id } = req.params;
        const { body: meetup } = req;

        try {
            const updatedMeetupId = await meetupsServices.updateMeetup({ id, meetup });
            res.status(200).json({
                datos: updatedMeetupId,
                message: 'Meetup updated'
            });
        } catch (error) {
            next(error);
        }
    })

    router.delete("/:id", async function (req, res, next) {
        const { id } = req.params;

        try {
            const deletedMeetupId = await meetupsServices.deleteMeetup({ id });
            res.status(200).json({
                datos: deletedMeetupId,
                message: 'Meetup deleted'
            });
        } catch (error) {
            next(error);
        }
    })
}

module.exports = meetupsApi;