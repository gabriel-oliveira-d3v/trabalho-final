/**
 * Coleção baseada em LISTA ENCADEADA.
 * Estrutura interna totalmente diferente da Playlist, mas como ambas
 * implementam [Symbol.iterator], o cliente percorre as duas exatamente
 * da mesma forma (for...of), sem precisar conhecer nós, arrays ou índices.
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

    [Symbol.iterator]() {
        let noAtual = this.inicio;

        return {
            hasNext() {
                return noAtual !== null;
            },
            next() {
                if (noAtual !== null) {
                    const musica = noAtual.musica;
                    noAtual = noAtual.proximo;
                    return { value: musica, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}

module.exports = Historico;
