
/*global module:true, test:true, equal:true, OpenSeadragon:true*/

(function() {

    module('DziTileSource', {
        setup: function() {
            testLog.reset();
        }
    });

    function testImplicitTilesUrl(dziUrl, expected, msg) {
        var source = new OpenSeadragon.DziTileSource();
        var options = source.configure({
            Image: {Size: {Width:0, Height: 0}}
        }, dziUrl);
        equal(options.tilesUrl, expected, msg);
    }

    test('test implicit tilesUrl guessed from dzi url', function() {
        testImplicitTilesUrl(
            '/path/my.dzi', '/path/my_files/',
            'dzi extension should be stripped');
        testImplicitTilesUrl(
            '/path/my', '/path/my_files/',
            'no extension should still produce _files path');
        testImplicitTilesUrl(
            '/my/', '/my_files/',
            'no extension with trailing slash should preserve slash');
        testImplicitTilesUrl(
            'my.xml', 'my_files/',
            'relative link should stay the same');
        testImplicitTilesUrl(
            '/p/foo.dzi?a=1&b=2', '/p/foo_files/',
            'querystring in dzi url should be ignored after slashes');
        testImplicitTilesUrl(
                '/iiipsrv?DeepZoom=/path/my.dzi', '/iiipsrv?DeepZoom=/path/my_files/',
                'querystring in dzi url should not be ignored before slashes');
        testImplicitTilesUrl(
                '/fcg-bin/iipsrv.fcgi?Deepzoom=123test.tif.dzi', '/fcg-bin/iipsrv.fcgi?Deepzoom=123test.tif_files/',
                'filename in querystring does not have to contain slash');
    });

}());
