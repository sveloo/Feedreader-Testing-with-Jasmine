$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URLs are not empty', function(){
            // Loop through the feed and check if the URL is defined and string contains 'http'
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toContain('http');
            };
        })

        it('Has a name defined', function(){
            // This loops through the feed to check if the name has a string as a title.
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeTruthy();
            }
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        it('Hidden by default', function() {
            // Checks to see if body has the class of menu-hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

        it('Visible on click', function(){
            // triggers the click of the menu icon
            // check to see if the menu-hidden class has been removed from the body tag
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // trigger another click of the menu icon to close the menu
            // check to see if the menu-hidden class has been added back to body tag
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    });


    describe('Initial Entries', function(){
        // load the feed before doing anything
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('At least a single .entry element in the .feed container', function(){
            // check to see if there are entries in the .feed
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })
    });


    describe('New Feed Selection', function() {
        var firstFeed,
            secondFeed;

        // loads the first feed and calculates its html length. I've console logged this.
        beforeAll(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                console.log(firstFeed.length);
                done();
            });
        });

        // this only executes once the above is done.
        it('Check if feed content is different', function(done) {
            // load the next feed.
            loadFeed(1, function() {
                secondFeed = $('.feed').html();
                expect(firstFeed).not.toEqual(secondFeed);
                // I've console.logged this to show the diferrence in length after the load.
                console.log(secondFeed.length);
            });
        });
    });

}());
