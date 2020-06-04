
// Tans valid time in milliseconds
exports.getTanValidDuration = function () {
    return 15 * 60 * 1000;
};

// Tans amount of requests before device will be blocked for up x hours (see cleanup time)
exports.getMaxRequestCount = function () {
    return 2;
};

// Tans cleanup time in milliseconds
exports.getCleanupTimeToken = function () {
    return 24* 60 * 60 * 1000;
};

// Messages cleanup time in milliseconds
exports.getCleanupTimeMessage = function () {
    return 2*24* 60 * 60 * 1000;
};
