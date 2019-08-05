import { Config, browser } from 'protractor';
import { SpecReporter } from 'jasmine-spec-reporter';
import { exec } from 'child_process';
import { protractor } from 'protractor/built/ptor';
import * as moment from 'moment';
import { async } from 'q';

let timeStamp = moment().format('YYYYMMDD_HHmmss');
var BeautifulReporter = require('protractor-beautiful-reporter');
var ChercherTechJasmineReporter = require('chercher-tech-jasmine-reporter');

export let config: Config = {

  specs: ['./src/tests/**/*.js'],
  
  resultJsonOutputFile: 'result.json',
  framework: 'jasmine',
    jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function () { }
  },

  SELENIUM_PROMISE_MANAGER: false,

  services: ['selenium-standalone'],
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: false,
    maxInstances: 3,
    chromeOptions: {
      args: [
        'disable-infobars=true',
        'start-maximized=true'
      ],
      prefs: {
        'credentials_enable__service': false,
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory: process.cwd() + '\\src\\downloads'
        }
      }
    }
  },
 
  onPrepare: async () => {

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true,
      },
    }));

    jasmine.getEnv().addReporter(new BeautifulReporter({
      baseDirectory: './TestReports/',
      screenshotsSubfolder: 'screencaptures',
      jsonsSubfolder: 'jsons',
      docName: timeStamp + '_Report.html',
      excludeSkippedSpecs: true,
      takeScreenShotsOnlyForFailedSpecs: true
    }).getJasmine2Reporter());

 
    jasmine.getEnv().addReporter(new ChercherTechJasmineReporter({
       baseDirectory: 'results'+timeStamp+'/screenshots'
   
       , screenshotsSubfolder: 'images',
     
    }));

    await browser.manage().timeouts().setScriptTimeout(0);
    await browser.manage().timeouts().pageLoadTimeout(120000);
    await browser.manage().timeouts().implicitlyWait(60000);
    await browser.waitForAngularEnabled(false);
    await browser.manage().deleteAllCookies();
  },

  beforeLaunch: async () => {
    var exec = require('child_process').execFile;
    var stopChromeDrivers = function () {
      console.log("Batch file to kill web drivers if running is started");
      exec('enddriver.bat', function (err: any, data: any) {

      });
    }
    var extractBatchUtility = function () {
      console.log("Batch file to extract Batch Utility started");
      exec('ExtractBatchUtility.bat', function (err: any, data: any) {

      });
    }
    var listAllApplicationsInstalledOnMachine = function () {
      console.log("Batch file to list All Applications Installed on Machine started");
      exec('listallapplicationsinstalled.bat', function (err: any, data: any) {

      });
    }

    stopChromeDrivers();
    extractBatchUtility();
    listAllApplicationsInstalledOnMachine();

  },

  onComplete: async () => {
    var origFn = browser.driver.controlFlow().execute;
    browser.driver.controlFlow().execute = function () {
      var args = arguments;
      origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
      });
      return origFn.apply(browser.driver.controlFlow(), args);
    };
   
  },

  afterLaunch:async() =>{
    return new Promise(function(resolve){
    return 0
    })
  },
  
 
  
};