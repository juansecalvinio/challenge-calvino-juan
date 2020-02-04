const joi = require('@hapi/joi');

const meetupUserIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createMeetupUserSchema = {
    meetup_id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    user_id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
}

module.exports = {
    meetupUserIdSchema,
    createMeetupUserSchema
}