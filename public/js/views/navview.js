define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'text!/templates/nav.html'
], function($, _, Backbone, Router, templateText){
    var NavView = Backbone.View.extend({
        tagName: 'div',

        template: _.template(templateText),

        events: {
            'click #btn-login': 'submitLogin',
            'submit #loginModal form': 'login',
            'click #btn-register': 'submitCreateAccount',
            'submit #registerModal form': 'createAccount',
            'click #nav-logout': 'logout'
        },

        initialize: function() {
            Backbone.on('page-switch', _.bind(function(){
                this.render(Router.view.navOptions);
            },this));
        },

        render: function(navOptions){
            this.$el.html(this.template());
            if(navOptions){
                if(navOptions.hideLogin)
                    this.$('#nav-login').hide();
                if(navOptions.hideRegister)
                    this.$('#nav-register').hide();
                if(navOptions.hideLogout)
                    this.$('#nav-logout').hide();
            }
            return this;
        },

        submitLogin: function() {
            console.log("clicking an invisible button");
            this.$('#real-btn-login').click();
        },

        login: function() {
            console.log("attempting to login");
            var formEls = $('#loginModal form')[0].elements
            var data = {
                email: formEls['loginUsername'].value,
                password: formEls['loginPassword'].value
            };
            $.ajax({
                type: "POST",
                url: '/api/login',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(data){
                window.session = data;
                Router.showSites();
            }).fail(function() {
                console.log("login failed");
                // TODO: show login failed to user
            });
        },

        submitCreateAccount: function() {
            console.log("clicking an invisible button");
            this.$('#real-btn-register').click();
        },

        createAccount: function() {
            var formEls = $('#registerModal form')[0].elements;
            var data = {
                email: formEls['registerEmail'].value,
                password: formEls['registerPassword'].value,
                // TODO: Confirm password with registerConfirmPassword
                isClient: false
            };
            $.ajax({
                type: "POST",
                url: '/api/users',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(data){
                window.session = data;
                Router.showSites();
            }).fail(function() {
                console.log("login failed");
                // TODO: show login failed to user
            });
        },

        logout: function() {
            $.get('/api/logout').done(function(data){
               window.session = null;
                Router.showFrontPage();
            });
        }
    });
    return NavView;
});