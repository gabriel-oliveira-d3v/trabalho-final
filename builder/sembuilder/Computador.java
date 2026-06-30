package sembuilder;

public class Computador {

private String processador;
private int memoria;
private int armazenamento;
private String placaVideo;
private boolean rgb;

public Computador(String processador,
                    int memoria,
                    int armazenamento,
                    String placaVideo,
                    boolean rgb) {

    this.processador = processador;
    this.memoria = memoria;
    this.armazenamento = armazenamento;
    this.placaVideo = placaVideo;
    this.rgb = rgb;
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
}