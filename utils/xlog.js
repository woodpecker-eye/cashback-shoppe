

const winston = require('winston');

function getCallerFunctionName() {
    const obj = {};
    Error.captureStackTrace(obj, getCallerFunctionName);
    const stackLines = obj.stack.split('\n');

    for (let i = 2; i < stackLines.length; i++) {
        const match = stackLines[i].match(/at (\S+)/);
        if (match && !match[1].startsWith('DerivedLogger')) {
            return match[1];
        }
    }

    return undefined;
}

const baselogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.errors({ stack: true }),
        winston.format.printf((info) => {
            const { timestamp, level, message, stack, function: fn, ...rest } = info;
            return JSON.stringify({
                timestamp,
                level,
                function: fn || undefined,
                message: stack || message,
                ...rest
            });
        })
    ),
    transports: [new winston.transports.Console()],
});


function wrap(level) {
    return (msg, ...args) => {
        let meta = {};
        let actualArgs = args;

        // Nếu cuối là object không phải Error → là meta
        if (
            args.length &&
            typeof args[args.length - 1] === 'object' &&
            !(args[args.length - 1] instanceof Error)
        ) {
            meta = args.pop();
            actualArgs = args;
        }

        meta.function = getCallerFunctionName();

        // Nếu có định dạng %s, %d → đẩy splat trước, meta cuối cùng
        if (typeof msg === 'string' && /%[sdifoOj]/.test(msg)) {
            baselogger.log(level, msg, ...actualArgs, meta);
        } else {
            // Không có định dạng → gộp message và meta lại
            baselogger.log(level, msg, meta);
        }
    };
}

const logger = {
    info: wrap('info'),
    warn: wrap('warn'),
    error: wrap('error'),
    debug: wrap('debug'),
};

module.exports = logger;
