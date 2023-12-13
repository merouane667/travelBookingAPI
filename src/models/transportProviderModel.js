const mongoose = require('mongoose');

const transportProviderSchema = new mongoose.Schema({
    providerId: {
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    logo: {
        type: String,
    },
    contactInfo: {
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const TransportProvider = mongoose.model('TransportProvider', transportProviderSchema);

module.exports = TransportProvider;
