class Hamburguer:
    def descricao(self): return "Hambúrguer"
    def preco(self): return 10.00

class ComQueijo(Hamburguer):
    def descricao(self): return super().descricao() + " + queijo"
    def preco(self): return super().preco() + 3.00

class ComBacon(Hamburguer):
    def descricao(self): return super().descricao() + " + bacon"
    def preco(self): return super().preco() + 5.00

class ComQueijoEBacon(Hamburguer):
    def descricao(self): return super().descricao() + " + queijo + bacon"
    def preco(self): return super().preco() + 8.00

# Nova combinação = nova classe. Com 4 ingredientes → até 16 classes!
