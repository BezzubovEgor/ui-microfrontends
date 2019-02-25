module.exports = {
    webpack: (config, env) => {
        config.output.jsonpFunction = 'microfrontend-products'
        return config;
    }
};
