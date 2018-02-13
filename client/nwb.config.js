module.exports = {
    type: 'web-app',
    npm: {
        cjs: false,
        esModules: false,
        umd: false
    },
    polyfill: false,
    webpack: {
        config(config) {
            config.entry = {
                app: ['./src/index.ts']
            };
            config.resolve.extensions.push('.ts');
            config.module.rules.push({
                test: /\.ts$/,
                loader: 'ts-loader'
            });

            return config;
        }
    }
};
