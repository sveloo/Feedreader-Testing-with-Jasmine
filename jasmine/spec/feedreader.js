/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs are not empty', function(){
            // Loop through the feed and check if the URL string contains 'http'
            // so that we can check that it's not empty and it's also a valid URL.
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toContain('http');
            }
         })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Has a name defined', function(){
            // This loops through the feed to check if the name has a string as a title.
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeTruthy();
            }
         })

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Hidden by default', function() {
            // Checks to see if body has the class of menu-hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Visible on click', function(){
            // triggers the click of the menu icon
            $('.menu-icon-link').click();
            // check to see if the menu-hidden class has been removed from the body tag
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // trigger another click of the menu icon to close the menu
            $('.menu-icon-link').click();
        })
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // load the feed before doing anything
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('At least a single .entry element in the .feed container', function(){
            // check to see if there are entries in the .feed
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
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
