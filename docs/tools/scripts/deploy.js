const ghpages = require('gh-pages');

ghpages.publish(
    'out',
    {
        branch: 'gh-pages',
        message: `Deploying project ${new Date()}`,
        dotfiles: true,
    },
    console.error
);
