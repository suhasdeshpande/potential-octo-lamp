"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const courier_1 = require("@trycourier/courier");
const client = (0, courier_1.CourierClient)({
    authorizationToken: process.env.COURIER_AUTH_TOKEN,
});
function notifyAboutLeaks() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.send({
            message: {
                to: {
                    list_id: "pigeons-on-call",
                },
                content: {
                    body: "There are leaks in the pipes",
                    title: "Pipe leak alert",
                },
                routing: {
                    channels: ["sms", "email"],
                    method: "single",
                },
            },
        });
    });
}
(function detectAndNotifyLeaks() {
    console.log("Detecting leaks...");
    // use setInterval to periodically check for leaks
    setInterval(() => {
        console.log("Checking for leaks...");
    }, 1000);
})();
