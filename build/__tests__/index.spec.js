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
const detect_leaks_1 = require("../src/detect-leaks");
jest.mock("rpi-gpio", () => ({
    setMode: jest.fn(),
    setup: jest.fn().mockResolvedValue(null),
    read: jest.fn().mockResolvedValue(true),
}));
describe("leaks detector", () => {
    it("should detect leaks", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, detect_leaks_1.detectLeaks)();
    }));
});
