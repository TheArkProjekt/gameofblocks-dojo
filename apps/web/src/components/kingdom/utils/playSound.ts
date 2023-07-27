import { sleep } from "~/components/kingdom/utils/sleep";

export const playSound = async (audio, numberOfTimes = 1, delay = 1000) => {
  audio.currentTime = 0;
  audio.play();
  if (numberOfTimes > 0) {
    numberOfTimes--;
    await sleep(delay);
    await playSound(audio, numberOfTimes, delay);
  }
};
