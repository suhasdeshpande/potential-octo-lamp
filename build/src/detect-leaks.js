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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectLeaks = void 0;
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
rpi_gpio_1.default.setMode(rpi_gpio_1.default.MODE_BCM);
const GROUND_PIN = 21;
const gpio = rpi_gpio_1.default.promise;
function detectLeaks() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Detecting leaks...");
        // setup the gpio
        yield gpio.setup(GROUND_PIN, rpi_gpio_1.default.DIR_IN);
        return new Promise((resolve, reject) => {
            // use setInterval to periodically check for leaks
            // returns Promise wrapped with setInterval
            const detectionInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                console.log("Checking for leaks...");
                try {
                    const isLeaking = yield gpio.read(GROUND_PIN);
                    if (isLeaking) {
                        console.log("Leak detected!");
                        resolve(true);
                        clearInterval(detectionInterval);
                    }
                }
                catch (error) {
                    console.log(`Encoutered error reading from pin ${GROUND_PIN}: ${JSON.stringify(error, null, 2)}`);
                    reject(false);
                }
            }), 1000);
        });
    });
}
exports.detectLeaks = detectLeaks;
