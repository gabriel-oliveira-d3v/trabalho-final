package combuilder;

public class Main {

    public static void main(String[] args) {

        Computador pc = new Computador.Builder()
                .processador("Ryzen 7")
                .memoria(32)
                .armazenamento(1000)
                .placaVideo("RTX 4060")
                .rgb(true)
                .build();

        System.out.println(pc);

    }
}