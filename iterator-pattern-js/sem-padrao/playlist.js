/**
 * Coleção baseada em ARRAY.
 * Sem o padrão Iterator, a classe precisa expor sua estrutura interna
 * (o array) para que o cliente consiga percorrer os elementos.
 * Isso quebra o encapsulamento: o cliente passa a conhecer detalhes de
 * implementação que deveriam ser internos à Playlist.
 */
class Playlist {
    constructor() {
        this.musicas = [];
    }

    adicionar(musica) {
        this.musicas.push(musica);
    }

    // Precisa expor o array interno para o cliente conseguir iterar
    getMusicas() {
        return this.musicas;
    }

    getTotal() {
        return this.musicas.length;
    }
}

module.exports = Playlist;
