package combuilder;

public class Computador {

    private String processador;
    private int memoria;
    private int armazenamento;
    private String placaVideo;
    private boolean rgb;

    private Computador() {
    }

    @Override
    public String toString() {
        return "Computador{" +
                "processador='" + processador + '\'' +
                ", memoria=" + memoria +
                ", armazenamento=" + armazenamento +
                ", placaVideo='" + placaVideo + '\'' +
                ", rgb=" + rgb +
                '}';
    }

    public static class Builder {

        private Computador computador;

        public Builder() {
            computador = new Computador();
        }

        public Builder processador(String processador) {
            computador.processador = processador;
            return this;
        }

        public Builder memoria(int memoria) {
            computador.memoria = memoria;
            return this;
        }

        public Builder armazenamento(int armazenamento) {
            computador.armazenamento = armazenamento;
            return this;
        }

        public Builder placaVideo(String placaVideo) {
            computador.placaVideo = placaVideo;
            return this;
        }

        public Builder rgb(boolean rgb) {
            computador.rgb = rgb;
            return this;
        }

        public Computador build() {
            return computador;
        }
    }
}