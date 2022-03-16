import GPIO from "rpi-gpio";

GPIO.setMode("mode_bcm");
const GROUND_PIN = 21;
const gpio = GPIO.promise;

export async function detectLeaks(): Promise<boolean> {
  console.log("Detecting leaks...");
  // setup the gpio
  await gpio.setup(GROUND_PIN, GPIO.DIR_IN);
  return new Promise((resolve, reject) => {
    // use setInterval to periodically check for leaks
    // returns Promise wrapped with setInterval
    const detectionInterval = setInterval(async () => {
      console.log("Checking for leaks...");
      try {
        const isLeaking = await gpio.read(GROUND_PIN);
        if (isLeaking) {
          console.log("Leak detected!");
          resolve(true);
          clearInterval(detectionInterval);
        }
      } catch (error) {
        console.log(
          `Encoutered error reading from pin ${GROUND_PIN}: ${JSON.stringify(
            error,
            null,
            2,
          )}`,
        );
        reject(false);
      }
    }, 1000);
  });
}
