module.exports = {
    webpack: (config, env) => {
        config.output.jsonpFunction = 'microfrontend-cart'
        return config;
    }
};
