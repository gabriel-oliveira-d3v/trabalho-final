/**
 * Coleção baseada em LISTA ENCADEADA (estrutura totalmente diferente da Playlist).
 * Sem o padrão Iterator, cada estrutura de dados exige uma lógica de
 * percurso diferente, e o cliente precisa conhecer essa lógica.
 */
class No {
    constructor(musica) {
        this.musica = musica;
        this.proximo = null;
    }
}

class Historico {
    constructor() {
        this.inicio = null;
        this.fim = null;
    }

    adicionar(musica) {
        const novoNo = new No(musica);
        if (this.inicio === null) {
            this.inicio = novoNo;
            this.fim = novoNo;
        } else {
            this.fim.proximo = novoNo;
            this.fim = novoNo;
        }
    }

    // Precisa expor o nó inicial para o cliente conseguir percorrer a lista
    getInicio() {
        return this.inicio;
    }
}

module.exports = Historico;
