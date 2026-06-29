from abc import ABC, abstractmethod

class Lanche(ABC):
    @abstractmethod
    def descricao(self): pass
    @abstractmethod
    def preco(self): pass

class Hamburguer(Lanche):
    def descricao(self): return "Hambúrguer"
    def preco(self): return 10.00

class Ingrediente(Lanche):
    def __init__(self, lanche, desc, valor):
        self._lanche, self._desc, self._valor = lanche, desc, valor
    def descricao(self): return self._lanche.descricao() + f" + {self._desc}"
    def preco(self): return self._lanche.preco() + self._valor

# Qualquer combinação sem criar novas classes!
lanche = Ingrediente(Ingrediente(Hamburguer(), "queijo", 3.00), "bacon", 5.00)
print(lanche.descricao())       # Hambúrguer + queijo + bacon
print(f"R$ {lanche.preco():.2f}")  # R$ 18.00
