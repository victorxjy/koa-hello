module.exports = {
    APIError: function (
        code = 'internal:unknown_error',
        message = ''
    ) {
        this.code = code;
        this.message = message;
    },
    restify(pathPrefix = '/api/') {
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                    return ctx.response;
                }
                try {
                    await next();
                } catch (error) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: error.code || 'internal:unknown_error',
                        message: error.message || ''
                    }
                }
            } else {
                await next();
            }
        }
    }
};
