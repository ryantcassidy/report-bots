/*jshint strict:false*/
/*global CasperError, console, phantom, require*/

var casper = require("casper").create({
    viewportSize: {
        width: 1024,
        height: 768
    }
});

var gerryUsername = "gerrystieber";
var gerryPassword = "stiebergerry";
  
casper.screenAndLog = function(filename) {
    this.captureSelector(filename, "html");
    this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
};

casper.verifyThisExists = function(selectr) {
    if(!this.exists(selectr)) {
      this.die("this doesn't exist, " + selectr);
    };
};
  
casper.start("https://twitter.com/login", function() {
    this.echo("Signing in to twitter");
    this.screenAndLog("a.jpg");
    //var formpath = x('//*[@class="t1-form clearfix signin js-signin"]');
    var formpath = ".t1-form.clearfix.signin.js-signin";
    this.verifyThisExists(formpath);

    this.fillSelectors(formpath, {
      'input[name="session[username_or_email]"]':    gerryUsername,
      'input[name="session[password]"]':             gerryPassword
    }, true);

    this.thenEvaluate( function () {
      document.querySelector(formPath).submit();
    });
});

// Try to make the Block dialog visible
casper.thenOpen("https://twitter.com/ChidiSchneider/status/473161569678131203", function() {
  //this.clickLabel('More', 'button');
  this.echo("Trying to make the block/report dialog visible...");
  this.click('div.action-more-container button.dropdown-toggle');
  this.screenAndLog("b1.jpg");
  this.click('li.block-or-report-link button.dropdown-link');
  this.screenAndLog("b2.jpg");
});

// Un-check "Block this user"
// It is checked by default
casper.then(function() {
  this.echo("Unchecking 'block this user'...");
  this.click('input[type="checkbox"][name="block_user"]');
  this.screenAndLog("c.jpg");
});


// Click the radio button for marking this tweet as 'spam'
casper.then(function() {
  casper.echo("Change radio button from 'annoying' to 'spam'...");
  var spamPath = 'input[type="radio"][value="spam"][name="report_type"]';
  this.click(spamPath);
  this.screenAndLog("d.jpg");
});

casper.then(function() {
  casper.echo("Submitting report form...");
  var submitBlockPath = 'button.report-tweet-report-button';
  this.verifyThisExists(submitBlockPath);
  this.click(submitBlockPath);
  this.screenAndLog("e.jpg");
});


casper.then(function() {
  casper.echo("Done");
  this.screenAndLog("f.jpg");
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
