/*jshint strict:false*/
/*global CasperError, console, phantom, require*/

var casper = require("casper").create({
    viewportSize: {
        width: 1024,
        height: 1024
    }
});

var gerryUsername = "gerrystieber";
var gerryPassword = "stiebergerry";
var screenshotnum = 1;
  
casper.screenAndLog = function(filename) {
    this.captureSelector(screenshotnum.toString() + "-" + filename, "html");
    this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
    screenshotnum += 1;
};

casper.verifyThisExists = function(selectr) {
    if(!this.exists(selectr)) {
      this.die("this doesn't exist, " + selectr);
    };
};
  
casper.start("https://twitter.com/login", function() {
    this.echo("Signing in to twitter");
    this.screenAndLog("signin.jpg");
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

casper.then(function(){
  this.screenAndLog("post-login.jpg");
});

// Try to make the Block dialog visible
casper.thenOpen("https://twitter.com/ChidiSchneider/status/473161569678131203", function() {
  this.echo("opened tweet indiv page");
});

casper.waitForSelector('div.action-more-container button.dropdown-toggle', function(){
  //this.clickLabel('More', 'button');
  this.echo("Trying to make the block/report dialog visible...");
  // Maybe don't need this first click
  this.click('div.action-more-container button.dropdown-toggle');
  this.screenAndLog("dropdown-clicked.jpg");
  this.click('li.block-or-report-link button.dropdown-link');
  this.screenAndLog("clicked-report-link.jpg");
});

// Un-check "Block this user"
// It is checked by default
casper.then(function() {
  this.echo("Unchecking 'block this user'...");
  this.click('input[type="checkbox"][name="block_user"]');
  this.screenAndLog("uncheck-block-user.jpg");
});

// Click the radio button for marking this tweet as 'spam'
casper.then(function() {
  this.echo("Change radio button from 'annoying' to 'spam'...");
  var spamPath = 'input[type="radio"][value="spam"][name="report_type"]';
  this.verifyThisExists(spamPath);
  this.click(spamPath);
  this.screenAndLog("click-radio.jpg");
});

casper.thenEvaluate(function() {
  document.querySelector('button.report-tweet-report-button').click();
});

casper.then(function(){
  this.echo("just clicked the button");
});

casper.wait(3000, function() {
  this.echo("I waited 3s");
});

/*
casper.then(function() {
  this.wait(3000);
});
*/


casper.then(function() {
  this.echo("Submitted report form and waited 3s...???");
  this.screenAndLog("done-huh.jpg");
});

casper.then(function() {
  this.echo("Done");
  this.screenAndLog("finished.jpg");
});

casper.run();
/*
casper.thenEvaluate(function() {
  this.echo("Submitting report form...???");
  var submitBlockPath = 'div.submit-section button:not([disabled="disabled"])';
  this.echo(document.querySelector(submitBlockPath));
  this.screenAndLog("done-huh.jpg");
});
*/
/*
casper.then(function() {
  casper.echo("Submitting report form...");
  //var submitBlockPath = 'div.submit-section button:not([disabled="disabled"])';
  //var submitBlockPath = 'button.report-tweet-report-button';
  //var submitBlockPath = 'button.btn.primary-btn.report-tweet-report-button';
  var submitBlockPath = 'button';
  
  this.thenEvaluate( function () {
    casper.echo(document.querySelector(submitBlockPath));
  });

  this.verifyThisExists(submitBlockPath);
  //this.click(submitBlockPath);
  this.thenEvaluate( function () {
    document.querySelector(submitBlockPath).click();
  });
  this.screenAndLog("submitted.jpg");
});

*/
