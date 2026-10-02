let cache = {};

function cacheMiddleware(req, res, next) {
    let key = req.originalUrl || req.url;

    if (req.method === "GET") {
        let cachedItem = cache[key];
        let now = Date.now();

        if (cachedItem) {
            if (now - cachedItem.createdAt < 60000) {
                res.setHeader("X-Cache", "HIT");
                return res.json(cachedItem.data);
            } else {
                delete cache[key];
            }
        }

        res.setHeader("X-Cache", "MISS");

        const originalJson = res.json.bind(res);
        res.json = function (body) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache[key] = {
                    data: body,
                    createdAt: Date.now()
                };
            }
            return originalJson(body);
        };

        return next();
    }

    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        const originalJson = res.json.bind(res);
        res.json = function (body) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                cache = {};
            }
            return originalJson(body);
        };
        return next();
    }

    next();
}

module.exports = cacheMiddleware;
