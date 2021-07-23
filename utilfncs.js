function log(level, msg) {
    /**
     * Simple logger.
     * @param {Number} level   the level on that should be logged. 0 - info, 1 - warnings, 2 - error, 3 - fatal error.
     * @param {String} msg  the message to be displayed.
     * 
     * @return {undefined}
     */
    if (level >= LOGLEVEL) {
        console.log(`[${['INFO','WARNING','ERROR','FATAL'][level]}] ${msg}`);
    }

    return;
}