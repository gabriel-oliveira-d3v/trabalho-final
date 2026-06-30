const Musica = require('./musica');
const Playlist = require('./playlist');
const Historico = require('./historico');

// ---- Playlist (array) ----
const playlist = new Playlist();
playlist.adicionar(new Musica('Bohemian Rhapsody', 'Queen'));
playlist.adicionar(new Musica('Imagine', 'John Lennon'));
playlist.adicionar(new Musica('Billie Jean', 'Michael Jackson'));

console.log('=== Playlist (percorrendo um array) ===');
// O cliente precisa saber que Playlist é baseada em array
const musicas = playlist.getMusicas();
for (let i = 0; i < playlist.getTotal(); i++) {
    console.log(musicas[i].toString());
}

// ---- Historico (lista encadeada) ----
const historico = new Historico();
historico.adicionar(new Musica('Hotel California', 'Eagles'));
historico.adicionar(new Musica('Smells Like Teen Spirit', 'Nirvana'));

console.log('\n=== Historico (percorrendo uma lista encadeada) ===');
// Lógica de percurso COMPLETAMENTE diferente da anterior:
// o cliente precisa conhecer a estrutura de nós encadeados
let atual = historico.getInicio();
while (atual !== null) {
    console.log(atual.musica.toString());
    atual = atual.proximo;
}

// PROBLEMA: se amanhã a Playlist trocar de array para outra estrutura,
// ou o Historico trocar de lista encadeada para outra estrutura,
// TODO o código cliente que percorre essas coleções precisa ser reescrito.
