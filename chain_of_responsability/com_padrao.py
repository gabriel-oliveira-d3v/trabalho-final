"""
SOLUÇÃO COM CHAIN OF RESPONSIBILITY
Padrão de projeto comportamental
"""

from abc import ABC, abstractmethod


class Requisicao:
    def __init__(self, id, valor):
        self.id = id
        self.valor = valor
        self.status = "Pendente"
        self.aprovado_por = None
    
    def __repr__(self):
        return f"Req #{self.id} | R${self.valor} | {self.status} | Aprovado por: {self.aprovado_por}"


# Chain of Responsibility
class Aprovador(ABC):
    """Classe abstrata que define o padrão"""
    
    def __init__(self, limite):
        self.limite = limite
        self.proximo = None
    
    def set_proximo(self, proximo):
        """Define o próximo na cadeia"""
        self.proximo = proximo
        return proximo
    
    def processar(self, requisicao):
        """Template Method - define o fluxo geral"""
        
        if self.pode_aprovar(requisicao.valor):
            # Aprova neste nível
            self.aprovar(requisicao)
        elif self.proximo:
            # Passa para o próximo
            print(f"   → {self.__class__.__name__} passa para {self.proximo.__class__.__name__}")
            self.proximo.processar(requisicao)
        else:
            # Ninguém aprova
            requisicao.status = "Rejeitada"
            requisicao.aprovado_por = None
            print(f"❌ Rejeitada: {requisicao}")
    
    @abstractmethod
    def pode_aprovar(self, valor):
        """Verifica se este aprovador pode processar"""
        pass
    
    @abstractmethod
    def aprovar(self, requisicao):
        """Aprova a requisição"""
        pass


class Gerente(Aprovador):
    """Aprova até 1000"""
    
    def pode_aprovar(self, valor):
        return valor <= self.limite
    
    def aprovar(self, requisicao):
        requisicao.status = "Aprovada"
        requisicao.aprovado_por = "Gerente"
        print(f"✅ Gerente aprovou: {requisicao}")


class Diretor(Aprovador):
    """Aprova até 10000"""
    
    def pode_aprovar(self, valor):
        return valor <= self.limite
    
    def aprovar(self, requisicao):
        requisicao.status = "Aprovada"
        requisicao.aprovado_por = "Diretor"
        print(f"✅ Diretor aprovou: {requisicao}")


class CEO(Aprovador):
    """Aprova até 100000"""
    
    def pode_aprovar(self, valor):
        return valor <= self.limite
    
    def aprovar(self, requisicao):
        requisicao.status = "Aprovada"
        requisicao.aprovado_por = "CEO"
        print(f"✅ CEO aprovou: {requisicao}")


if __name__ == "__main__":
    print("=" * 60)
    print("COM CHAIN OF RESPONSIBILITY")
    print("=" * 60)
    print()
    
    # Criar a cadeia
    gerente = Gerente(limite=1000)
    diretor = Diretor(limite=10000)
    ceo = CEO(limite=100000)
    
    # Conectar: Gerente -> Diretor -> CEO
    gerente.set_proximo(diretor).set_proximo(ceo)
    
    # Testes (mesmos valores)
    req1 = Requisicao("001", 500)
    req2 = Requisicao("002", 5000)
    req3 = Requisicao("003", 50000)
    req4 = Requisicao("004", 150000)
    
    for req in [req1, req2, req3, req4]:
        print(f"Processando: {req}")
        gerente.processar(req)
        print()
