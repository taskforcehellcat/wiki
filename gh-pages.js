import { publish } from 'gh-pages';

publish(
    'build', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/Venrix/tfhc-website.git', // Update to point to your repository
        user: {
            name: 'Venrix', // update to use your name
            email: 'imvenrix@gmail.com' // Update to use your email
        },
        dotfiles: true
    },
    () => {
        console.log('Deploy Complete!');
    }
);