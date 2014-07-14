/*jshint strict:false*/
/*global CasperError, console, phantom, require*/

var casper = require("casper").create({
    viewportSize: {
        width: 1024,
        height: 768
    }
});

var x = require('casper').selectXPath;

var gerryUsername = "gerrystieber";
var gerryPassword = "stiebergerry";
  
casper.screenAndLog = function(filename) {
    this.captureSelector(filename, "html");
    this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
};
  
casper.start("https://twitter.com/login", function() {
    this.echo("Signing in to twitter");
    this.screenAndLog("a.jpg");
    var formpath = x('//*[@class="t1-form clearfix signin js-signin"]');
    if(!this.exists(formpath)) {
      this.die()
    };

    this.fillSelectors(formpath, {
      'input[name="session[username_or_email]"]':    gerryUsername,
      'input[name="session[password]"]':             gerryPassword
    }, true);

    this.thenEvaluate( function () {
      document.querySelector(formPath).submit();
    });
});

casper.thenOpen("https://twitter.com/ChidiSchneider/status/473161569678131203", function() {
  this.screenAndLog("b.jpg");
  // var dropdownPath = x('//*[@class="action-more-container"]');
  // if(!this.exists(dropdownPath)) { this.die("hi"); };
  this.clickLabel('Block or Report', 'button');
  this.screenAndLog("c.jpg");
});

casper.then( function() {
  this.screenAndLog("d.jpg");
});

/*
    var btnpath = x('//*[@class="submit btn primary-btn"]');
    if(!this.exists(btnpath)) {
      this.die()
    };

    this.click(btnpath);
    this.wait(4000);
    this.screenAndLog("b.jpg");
    this.echo("Signed in?");
casper.start("https://twitter.com/GerryStieber/status/473161868820099072", function() {
    this.waitForSelector("tweet", (function() {
        this.captureSelector(filename, "html");
        this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
    }), (function() {
        this.die("Timeout reached. Fail whale?");
        this.exit();
    }), 25000);
});
*/

casper.run();
