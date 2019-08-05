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
let path = require('path');
let scriptName = path.basename(__filename);
describe('File Name: ' + scriptName, () => __awaiter(this, void 0, void 0, function* () {
    let credentials = { oldItsUser: "", oldItsPassword: "", newItsUser: "", newItsPassword: "" };
    describe('launching google', () => __awaiter(this, void 0, void 0, function* () {
        it('Click on the Heading of the Client Widget to Navigate to Full View', () => __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get("https:\\www.google.com");
        }));
    }));
}));
