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
            }
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


    describe('New Feed Selection', function(){

        // declaring variables outside the it scope.
        var firstFeed, secondFeed;

        // here I load the feed and get the length of characters in the feed
        beforeEach(function(done) {
            loadFeed(0, done);
            // store result in firstFeed variable
            firstFeed = $('.feed .entry').text().length;
            console.log('First feed length:' + firstFeed);
        });

        it('New feed changes content of page', function(done){
            // here I load the second feed, wait till it's loaded,
            loadFeed(1, function(){
                done();
                // count the number of characters in the second feed
                secondFeed = $('.feed .entry').text().length;
                console.log('Second feed length:' + secondFeed);
            })
            // the two feeds should have different length of characters
            expect(firstFeed).not.toEqual(secondFeed);
        });
    })
}());
