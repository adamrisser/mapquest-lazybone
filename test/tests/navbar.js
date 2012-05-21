require(['core/views/navbar'], function (NavBar) {
    
    var nav = 
        '<ul id="nav">' + 
            '<li class="selected"><a class="directions" href="/#/directions">Directions</a><div class="icon"></div></li>' + 
            '<li><a class="places" href="/#/search">Places</a></li>' + 
            '<li><a class="neighborhoods" href="/#/explore/neighborhoods/380454">Neighborhoods</a></li>' + 
            '<li><a class="parks" href="/#/explore/nationalparks">Parks</a></li>' + 
        '</ul>';
    
    test('Should be defined', 1, function () {
        ok(NavBar);
    });
    
    module('Initialization', {
        
        setup: function () {
            $('#qunit-fixture').html(nav);
            sinon.spy(NavBar.prototype, '_toActive');
        },
        
        teardown: function () {
            this.bar.dispose();
            NavBar.prototype._toActive.restore();
        }
        
    });
    
    test('Can be instantiated', 1, function () {
        this.bar = new NavBar();
        ok(this.bar);
    });
    
    test('Navbar defaults to the first list item', 2, function () {
        var _toActive = NavBar.prototype._toActive;
        
        // init bar to the vibe tab
        this.bar = new NavBar;
        
        // did instantiating the NavBar try and activate a tab?
        ok(_toActive.calledOnce);
        
        // was it the correct tab?
        equal(
            $('.selected a').prop('class'), 
            _toActive.getCall(0).args[0].prop('class')
        );
    });
    
    test('Navbar loads to the proper list item in the hash', 2, function () {
        var _toActive = NavBar.prototype._toActive,
            hash = '/explore/neighborhoods/380454';
        
        // init bar to the vibe tab
        this.bar = new NavBar({ hash: hash });
        
        // did instantiating the NavBar try and activate a tab?
        ok(_toActive.calledOnce);
        
        // was it the correct tab?
        equal(
            $('a[href$="/#' + hash + '"]').prop('class'), 
            _toActive.getCall(0).args[0].prop('class')
        );
    });
    
    // ----------------------------------------------------------------------
    
    module('Event handling', {
        
        setup: function () {
            $('#qunit-fixture').html(nav);
            sinon.spy(NavBar.prototype, '_handleClick');
            sinon.spy(NavBar.prototype, '_animateTo');
            this.bar = new NavBar;
        },
        
        teardown: function () {
            NavBar.prototype._handleClick.restore();
            NavBar.prototype._animateTo.restore();
            this.bar.dispose();
        }
        
    });
    
    test('Click handler is fired on a user click', 2, function () {
        
        // simulate click on the parks button
        $('.parks').click();
        
        // did instantiating the NavBar try and activate a tab?
        ok(NavBar.prototype._handleClick.calledOnce, 'Click handler was called');
        
        // make sure it tried to animate
        ok(NavBar.prototype._animateTo.calledOnce, 'Tried to start animating');
    });
    
    // ----------------------------------------------------------------------
    
    module('Animation', {
        
        setup: function () {
            $('#qunit-fixture').html(nav);
            sinon.spy(NavBar.prototype, '_getCursorPos');
            sinon.spy(NavBar.prototype, '_setSelected');
            sinon.spy(jQuery.prototype, 'animate');
            this.bar = new NavBar;
        },
        
        teardown: function () {
            this.bar.dispose();
            NavBar.prototype._getCursorPos.restore();
            NavBar.prototype._setSelected.restore();
            jQuery.prototype.animate.restore();
        }
        
    });
    
    test('_getCursorPos finds the correct left position of the caret', 4, function () {

        var pos = this.bar._getCursorPos($('.directions'));        
        equal('-9948.5px', pos.left, 'Correct position found for directions');
        
        var pos = this.bar._getCursorPos($('.places'));        
        equal('-9858.25px', pos.left, 'Correct position found for places');
        
        var pos = this.bar._getCursorPos($('.neighborhoods'));        
        equal('-9745.56640625px', pos.left, 'Correct position found for vibe');
        
        var pos = this.bar._getCursorPos($('.parks'));        
        equal('-9636.4833984375px', pos.left, 'Correct position found for parks');
                
    });
    
    test('_animateTo calls jQuery.animate using the CursorPos', 3, function () {
        
        this.bar._animateTo($('.parks'));

        // make sure it gets the position and it tries to animate
        ok(NavBar.prototype._getCursorPos.calledTwice);
        ok(jQuery.prototype.animate.calledTwice);
        
        equal('-9636.4833984375px', jQuery.prototype.animate.secondCall.args[0].left, 'Called with the correct parameter');
    });
    
    test('Test that _setSelected correctly removes the previous selected class and adds a new selected class to the proper element', 2, function () {
        this.bar._setSelected($('.parks'));
        
        equal($('.directions').parent('li').prop('class'), '', 'Directions tab should not be selected');
        equal($('.parks').parent('li').prop('class'), 'selected', 'Parks is not selected');
    });
    
});
