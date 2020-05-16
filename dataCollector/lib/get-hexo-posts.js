var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

const getHexoPosts = async () => {
    await hexo.load().then(function(){
        return hexo.model('Post').map(post => ({
            slug: post.slug,
        }));
    });
}

module.exports = getHexoPosts;
