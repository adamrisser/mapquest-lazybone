require(['core/views/navbar'], function (NavBar) {
    
    var nav =
        '<div class="navbar">' +
        '    <div class="navbar-inner">' +
        '        <ul class="nav">' +
        '            <li id="first-item"><a href="/#/one">one</a></li>' +
        '            <li id="second-item"><a href="/#/two">two</a></li>' +
        '            <li id="third-item"><a href="/#/three">three</a></li>' +
        '            <li id="fourth-item"><a href="/#/four">four</a></li>' +
        '        </ul>' +
        '    </div>' +
        '</div>';
    
    test('Should be defined', 1, function () {
        ok(NavBar);
    });
    
    QUnit.module('Initialization', {
        
        setup: function () {
            $('#qunit-fixture').html(nav);
            sinon.spy(NavBar.prototype, 'setActive');
        },
        
        teardown: function () {
            NavBar.prototype.setActive.restore();
        }
        
    });
    
    QUnit.test('Can be instantiated', 1, function () {
        this.bar = new NavBar();
        ok(this.bar);
    });
    
    QUnit.test('Navbar defaults to the first list item', 2, function () {
        var setActive = NavBar.prototype.setActive;
        
        // init bar to the vibe tab
        this.bar = new NavBar();
        
        // did instantiating the NavBar try and activate a tab?
        ok(setActive.calledOnce);
        
        // was it the correct tab?
        ok($('#first-item').hasClass('active'), 'First element should of have been active.');
    });
    
    QUnit.test('Navbar loads to the proper list item in the hash', 3, function () {
        var setActive = NavBar.prototype.setActive,
            hash = '/two';
        
        // init bar to the vibe tab
        this.bar = new NavBar({ hash: hash });
        
        // did instantiating the NavBar try and activate a tab?
        ok(setActive.calledOnce);
        
        // was it the correct tab?
        ok($('#second-item').hasClass('active'));

        // make sure only one item is active
        equal(1, $('.navbar li.active').length);
    });

    QUnit.test('Bad hash should not set any thing active.', 2, function () {
        var setActive = NavBar.prototype.setActive,
            hash = '/tootoo';
        
        // init bar to the vibe tab
        this.bar = new NavBar({ hash: hash });
        
        // did instantiating the NavBar try and activate a tab?
        ok(setActive.calledOnce);

        // make sure only one item is active
        equal(0, $('.navbar li.active').length);
    });
    
    // ----------------------------------------------------------------------
    
    module('Event handling', {
        
        setup: function () {
            $('#qunit-fixture').html(nav);
            sinon.spy(NavBar.prototype, 'handleClick');
            sinon.spy(NavBar.prototype, 'setActive');
            this.bar = new NavBar();
        },
        
        teardown: function () {
            NavBar.prototype.handleClick.restore();
            NavBar.prototype.setActive.restore();
        }
        
    });
    
    test('Click handler is fired on a user click', 4, function () {
        
        // simulate click on the parks button
        $('#third-item a').click();
        
        // did instantiating the NavBar try and activate a tab?
        ok(NavBar.prototype.handleClick.calledOnce, 'Click handler was called');
        
        // make sure it tried to animate
        ok(NavBar.prototype.setActive.calledTwice, 'setActive was called only once.');

        // esnure only one item is active
        equal(1, $('.navbar li.active').length);

        // make sure the third item has the active class
        ok($('#third-item').hasClass('active'));
    });
    
});
