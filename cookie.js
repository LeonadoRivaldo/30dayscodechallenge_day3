console.log('yeet! It works!');

(function (document, window) {
    'use strict';

    var readCookie =  function(params) {
        var name = params.name;
        //if no name return 
        if(!name){
            return;
        }

        //dividindo a string in dois
        var parts = document.cookie.split(name+'=');


        //vamos verificar o tamanho do array, que deve ser dois o nome do cookie e o valor
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());

        // return caso undefined
        return;
    };
    var createCookie = function(params){
        params.name = params.name || false; // cookie name / key
        params.value = params.value || ''; // cookie value
        params.expires = params.expires || false; // cookie expires (days)
        params.path = params.path || '/'; // cookie path. defaults to '/' the whole website.


        if(!params.name){
            alert("Cookie name is required!");
            return false;
        }

        if (params.name) {
            var cookie = encodeURIComponent(params.name) + '=' + encodeURIComponent(params.value) + ';';
            var path    = 'path=' + params.path + ';';
            var domain  = params.domain ? 'domain=' + params.domain + ';' : '';
            var secure  = params.secure ? 'secure;' : '';
            var httpOnly  = params.httpOnly ? 'httpOnly;' : '';
            var expires = '';
    
            // If the params object contains expires in days.
            if (params.expires) {
                params.expires = new Date(new Date().getTime() + parseInt(params.expires, 10) * 1000 * 60 * 60 * 24);
                // use toUTCString method to convert expires date to a string, 
                // using the UTC time zone.
                expires = 'expires=' + params.expires.toUTCString() + ';';
            }
    
            // assign all the concatenated values to document.cookie.
            document.cookie = cookie + expires + path + domain + secure + httpOnly;
            return true;
        }

        //false if not created!
        return false;

    };
    var existsCookie = function(params){
        // checks the `params` object for property name
        if (!params || !params.name) {
            return;
        }

        // call the read method providing the `params` object as parameter
        if (this.read(params)) {
            return true;
        }

        return false;
    };
    var listCookieAsObject = function(){
        var cookiesObj = {}; // an empty object to store retrieved cookies.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var cookie;

        if (!cookies) {
            return cookiesObj;
        }

        cookies.forEach(function(c){
            cookie = c.split('=');
            cookiesObj[decodeURIComponent(cookie[0])] = decodeURIComponent(cookie[1]);
        });
        
        return cookiesObj;
    };
    var removeCookie = function(params){
        if (!params){
            return;
        }
        if (this.read(params)) {
            return this.create({
                name: params.name,
                value: ' ', // set value to empty string
                expires: -1, // reset expires
                path: params.path,
                domain: params.domain
            });
        }
    
        return false;
    }


    var cookiet = {
        read: readCookie,
        create:createCookie,
        listAsObject:listCookieAsObject,
        remove:removeCookie,
    };

    // our cookiet object will be here.

     if (typeof define === 'function' && define.amd) {
         define([], function () {
             return cookiet;
        });
    } else {
        window.cookiet = cookiet;
    }
}(document, window));
