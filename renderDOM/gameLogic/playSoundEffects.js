export function playSoundEffects(soundname){
    const audio = new Audio(`../../assets/sounds/${soundname}.mp3`);
    audio.loop = false;
    audio.type = 'audio/mpeg';
    audio.addEventListener("canplaythrough", (event) => {
        /* the audio is now playable; play it if permissions allow */
        audio.play(); 
    });
    
}