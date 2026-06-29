import copy

class CamisetaPrototype:
    def __init__(self, estampa: str, tecido: str, cor: str, tamanho: str):
        self.estampa = estampa
        self.tecido = tecido
        self.cor = cor
        self.tamanho = tamanho

    def clonar(self):
        # O coração do Prototype: realiza uma cópia profunda do objeto
        return copy.deepcopy(self)

    def __str__(self):
        return f"Camiseta [Estampa: {self.estampa}, Tecido: {self.tecido}, Cor: {self.cor}, Tamanho: {self.tamanho}]"

if __name__ == "__main__":
    print("--- Cenário Com Padrão (Prototype) ---")
    # Instancia o protótipo pesado apenas uma vez
    prototipo_anime = CamisetaPrototype("Anime X", "Algodão Premium", "Preta", "M")

    # Cria variações apenas clonando e modificando o necessário
    camisa_g = prototipo_anime.clonar()
    camisa_g.tamanho = "G"

    camisa_branca = prototipo_anime.clonar()
    camisa_branca.cor = "Branca"

    print(f"Original: {prototipo_anime}")
    print(f"Variação 1: {camisa_g}")
    print(f"Variação 2: {camisa_branca}")