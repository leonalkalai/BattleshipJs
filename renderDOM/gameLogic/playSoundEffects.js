export function playSoundEffects(soundname){
    const audio = new Audio(`../../assets/sounds/${soundname}.mp3`);
    audio.loop = false;
    audio.play(); 
}