class Musica {
    constructor(titulo, artista) {
        this.titulo = titulo;
        this.artista = artista;
    }

    toString() {
        return `${this.titulo} - ${this.artista}`;
    }
}

module.exports = Musica;
