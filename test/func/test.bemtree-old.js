var fs = require('fs'),
    path = require('path'),
    fixturesPath = path.join(__dirname, '..', 'fixtures', 'bemtree-old'),
    devBemtreePath = path.join(fixturesPath, 'page', 'page.dev.bemtree.js'),
    prodBemtreePath = path.join(fixturesPath, 'page', 'page.prod.bemtree.js'),
    data = require(path.join(fixturesPath, 'data', 'data.json')),
    view = require(path.join(fixturesPath, 'result', 'view.json'));

require('chai').should();

describe('functional', function() {
    describe('bemtree-old', function() {
        it('should build simple view of page in dev mode', function(done) {
            var bemtree = require(devBemtreePath).BEMTREE;

            bemtree.apply(data).then(function(res) {
                res.should.eql(view);
                done();
            });
        });

        it('should build simple view of page in production mode', function(done) {
            var bemtree = require(prodBemtreePath).BEMTREE;

            bemtree.apply(data).then(function(res) {
                res.should.eql(view);
                done();
            });
        });

        it('should build different code by mode', function() {
            var devStat = fs.statSync(devBemtreePath),
                prodStat = fs.statSync(prodBemtreePath);

            devStat.size.should.be.above(prodStat.size);
        });
    });
});
