"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
const ptor_1 = require("protractor/built/ptor");
const moment = require("moment");
let timeStamp = moment().format('YYYYMMDD_HHmmss');
var BeautifulReporter = require('protractor-beautiful-reporter');
var ChercherTechJasmineReporter = require('chercher-tech-jasmine-reporter');
exports.config = {
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
    onPrepare: () => __awaiter(this, void 0, void 0, function* () {
        jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
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
            baseDirectory: 'results' + timeStamp + '/screenshots',
            screenshotsSubfolder: 'images',
        }));
        yield protractor_1.browser.manage().timeouts().setScriptTimeout(0);
        yield protractor_1.browser.manage().timeouts().pageLoadTimeout(120000);
        yield protractor_1.browser.manage().timeouts().implicitlyWait(60000);
        yield protractor_1.browser.waitForAngularEnabled(false);
        yield protractor_1.browser.manage().deleteAllCookies();
    }),
    beforeLaunch: () => __awaiter(this, void 0, void 0, function* () {
        var exec = require('child_process').execFile;
        var stopChromeDrivers = function () {
            console.log("Batch file to kill web drivers if running is started");
            exec('enddriver.bat', function (err, data) {
            });
        };
        var extractBatchUtility = function () {
            console.log("Batch file to extract Batch Utility started");
            exec('ExtractBatchUtility.bat', function (err, data) {
            });
        };
        var listAllApplicationsInstalledOnMachine = function () {
            console.log("Batch file to list All Applications Installed on Machine started");
            exec('listallapplicationsinstalled.bat', function (err, data) {
            });
        };
        stopChromeDrivers();
        extractBatchUtility();
        listAllApplicationsInstalledOnMachine();
    }),
    onComplete: () => __awaiter(this, void 0, void 0, function* () {
        var origFn = protractor_1.browser.driver.controlFlow().execute;
        protractor_1.browser.driver.controlFlow().execute = function () {
            var args = arguments;
            origFn.call(protractor_1.browser.driver.controlFlow(), function () {
                return ptor_1.protractor.promise.delayed(100);
            });
            return origFn.apply(protractor_1.browser.driver.controlFlow(), args);
        };
    }),
    afterLaunch: () => __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve) {
            return 0;
        });
    }),
};
