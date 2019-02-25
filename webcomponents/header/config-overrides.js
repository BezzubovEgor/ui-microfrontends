module.exports = {
    webpack: (config, env) => {
        config.output.jsonpFunction = 'microfrontend-header'
        return config;
    }
};
