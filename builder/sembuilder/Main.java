package sembuilder;

public class Main {

    public static void main(String[] args) {

        Computador pc = new Computador(
                "Ryzen 7",
                32,
                1000,
                "RTX 4060",
                true
        );

        System.out.println(pc);

    }
}