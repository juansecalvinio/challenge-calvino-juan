const MongoLib = require('./../lib/mongo');
const MeetupsService = require('./meetups.js');

class MeetupsUserService {
    constructor() {
        this.collection = 'meetups_users';
        this.mongoDB = new MongoLib();
    }

    async getMeetupsUser({ id }) {
        const meetupsUser = await this.mongoDB.find(
            this.collection,
            id
        );
        return meetupsUser || {};
    }

    async createMeetupUser({ meetupUser }) {
        const createdMeetupUserId = await this.mongoDB.create(
            this.collection,
            meetupUser
        );
        return createdMeetupUserId;
    }
}

module.exports = MeetupsUserService;