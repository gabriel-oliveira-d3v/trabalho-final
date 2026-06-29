class Camiseta:
    def __init__(self, estampa: str, tecido: str, cor: str, tamanho: str):
        self.estampa = estampa
        self.tecido = tecido
        self.cor = cor
        self.tamanho = tamanho

    def __str__(self):
        return f"Camiseta [Estampa: {self.estampa}, Tecido: {self.tecido}, Cor: {self.cor}, Tamanho: {self.tamanho}]"

if __name__ == "__main__":
    print("--- Cenário Sem Padrão ---")
    # Repetindo dados manualmente para criar variações
    modelo_base = Camiseta("Anime X", "Algodão Premium", "Preta", "M")
    camisa_cliente1 = Camiseta("Anime X", "Algodão Premium", "Preta", "G")
    camisa_cliente2 = Camiseta("Anime X", "Algodão Premium", "Branca", "M")
    
    print(modelo_base)
    print(camisa_cliente1)
    print(camisa_cliente2)