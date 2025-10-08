import { surpriseMePrompts } from "../constant";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt){ // cette fonction va nous retourner une invite prompt aléatoire 
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); // génère un index aléatoire entre 0 et la longueur du tableau de prompts
    const randomPrompt = surpriseMePrompts[randomIndex]; // obtenir le prompt à l'index aléatoire

    if(randomPrompt === prompt) return getRandomPrompt(prompt); // si le prompt aléatoire est le même que celui fourni, rappeler la fonction pour obtenir un nouveau prompt

    return randomPrompt; // retourner le prompt aléatoire
}

export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

// math.random() génère un nombre aléatoire entre 0 et 1
// math.floor() LA PARTIE ENTIÈRE D'UN NOMBRE (ARRONDI VERS LE BAS)
