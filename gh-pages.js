var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/Venrix/tfhc-website/tree/svelte.git', // Update to point to your repository  
        user: {
            name: 'Venrix', // update to use your name
            email: 'imvenrix@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)