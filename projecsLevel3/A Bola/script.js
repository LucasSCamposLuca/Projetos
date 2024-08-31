// const ring = document.querySelector('.ring');
// const duration = 24;
// const numItems = 32;

// for(let i = 0; i < numItems; i++){
//     const item = document.createElement('i');
//     const hue = i * 98;
//     const delay = (duration / numItems) * i;
//     const rx = Math.random() * 360;
//     const ry = Math.random() * 360;
//     const rz = Math.random() * 360;

//     item.style.setProperty('--delay', `${delay}s`);
//     item.style.setProperty('--hue', hue);
//     item.style.setProperty('--rx', `${rx}deg`);
//     item.style.setProperty('--ry', `${ry}deg`);
//     item.style.setProperty('--rz', `${rz}deg`);
//     item.style.borderColor = `hsl(${hue}, 100%, 75%)`;
//     item.style.boxShadow = `0 0 1em hsl(${hue}, 100%, 75%) inset, 0 0 1em hsl(${hue}, 100%, 75%)`;
//     item.style.animationDelay = `${delay}s`;

//     ring.appendChild(item);
// }
// const ring = document.querySelector('.ring');
// const duration = 24;
// const numItems = 64;  // Aumente o número de itens para suavizar a animação

// for (let i = 0; i < numItems; i++) {
//     const item = document.createElement('i');
//     const hue = i * 360 / numItems;  // Espalhe as cores de maneira uniforme
//     const delay = (duration / numItems) * i;
//     const rx = Math.random() * 360;
//     const ry = Math.random() * 360;
//     const rz = Math.random() * 360;

//     item.style.setProperty('--delay', `${delay}s`);
//     item.style.setProperty('--hue', hue);
//     item.style.setProperty('--rx', `${rx}deg`);
//     item.style.setProperty('--ry', `${ry}deg`);
//     item.style.setProperty('--rz', `${rz}deg`);
//     item.style.borderColor = `hsl(${hue}, 100%, 75%)`;
//     item.style.boxShadow = `0 0 1em hsl(${hue}, 100%, 75%) inset, 0 0 1em hsl(${hue}, 100%, 75%)`;
//     item.style.animationDelay = `${delay}s`;

//     ring.appendChild(item);
// }
const ring = document.querySelector('.ring');
const duration = 24;
const numItems = 16;  // Reduzido para 16 itens

for (let i = 0; i < numItems; i++) {
    const item = document.createElement('i');
    const hue = i * 360 / numItems;  // Distribuição de cores ajustada
    const delay = (duration / numItems) * i;
    const rx = Math.random() * 360;
    const ry = Math.random() * 360;
    const rz = Math.random() * 360;

    item.style.setProperty('--delay', `${delay}s`);
    item.style.setProperty('--hue', hue);
    item.style.setProperty('--rx', `${rx}deg`);
    item.style.setProperty('--ry', `${ry}deg`);
    item.style.setProperty('--rz', `${rz}deg`);
    item.style.borderColor = `hsl(${hue}, 100%, 75%)`;
    item.style.boxShadow = `0 0 1em hsl(${hue}, 100%, 75%) inset, 0 0 1em hsl(${hue}, 100%, 75%)`;
    item.style.animationDelay = `${delay}s`;

    ring.appendChild(item);
}
