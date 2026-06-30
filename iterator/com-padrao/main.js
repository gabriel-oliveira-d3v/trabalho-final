const Musica = require('./musica');
const Playlist = require('./playlist');
const Historico = require('./historico');

const playlist = new Playlist();
playlist.adicionar(new Musica('Bohemian Rhapsody', 'Queen'));
playlist.adicionar(new Musica('Imagine', 'John Lennon'));
playlist.adicionar(new Musica('Billie Jean', 'Michael Jackson'));

const historico = new Historico();
historico.adicionar(new Musica('Hotel California', 'Eagles'));
historico.adicionar(new Musica('Smells Like Teen Spirit', 'Nirvana'));

// Mesma lógica de percurso para AMBAS as coleções, mesmo elas tendo
// estruturas internas completamente diferentes (array x lista encadeada).
// O cliente não sabe e não precisa saber como cada uma é implementada.

console.log('=== Playlist ===');
for (const musica of playlist) {
    console.log(musica.toString());
}

console.log('\n=== Historico ===');
for (const musica of historico) {
    console.log(musica.toString());
}

// Também é possível usar o iterator explicitamente:
console.log('\n=== Playlist usando o iterator explicitamente ===');
const it = playlist[Symbol.iterator]();
let resultado = it.next();
while (!resultado.done) {
    console.log(resultado.value.toString());
    resultado = it.next();
}

// VANTAGEM: se a Playlist ou o Historico mudarem sua estrutura interna
// (por exemplo, trocar array por Map ou Set), este código cliente
// continua funcionando sem nenhuma alteração.
