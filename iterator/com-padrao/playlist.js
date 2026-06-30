/**
 * Coleção baseada em ARRAY.
 * Agora a Playlist implementa o protocolo de iteração do JavaScript
 * (método [Symbol.iterator]), que é o equivalente nativo da linguagem
 * para o padrão Iterator do GoF. O array interno deixa de ser exposto:
 * tudo que o cliente precisa é usar for...of (ou chamar o iterator
 * manualmente).
 */
class Playlist {
    constructor() {
        this.musicas = [];
    }

    adicionar(musica) {
        this.musicas.push(musica);
    }

    // Define como a Playlist é percorrida, sem expor o array internamente
    [Symbol.iterator]() {
        let posicaoAtual = 0;
        const musicas = this.musicas;

        // ConcreteIterator: objeto que conhece os detalhes internos (array)
        // e implementa o protocolo padrão { next() -> { value, done } }
        return {
            hasNext() {
                return posicaoAtual < musicas.length;
            },
            next() {
                if (posicaoAtual < musicas.length) {
                    return { value: musicas[posicaoAtual++], done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}

module.exports = Playlist;
