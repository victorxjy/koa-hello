async function welcome(ctx, next) {
    ctx.body = `<h1>Welcome to Koa!</h1>`;
}


async function hello(ctx, next) {
    ctx.body = `<h1>Hello, world!</h1>`;
}


module.exports = [
    ['get', '/', welcome],
    ['get', '/hello', hello]
];
