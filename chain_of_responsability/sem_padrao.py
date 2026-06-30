"""
SOLUÇÃO SEM CHAIN OF RESPONSIBILITY
Lógica centralizada com if/elif/else
"""

class Requisicao:
    def __init__(self, id, valor):
        self.id = id
        self.valor = valor
        self.status = "Pendente"
        self.aprovado_por = None
    
    def __repr__(self):
        return f"Req #{self.id} | R${self.valor} | {self.status} | Aprovado por: {self.aprovado_por}"


def processar_requisicao(requisicao):
    """Processa requisição usando if/elif/else"""
    
    # Gerente aprova até 1000
    if requisicao.valor <= 1000:
        requisicao.status = "Aprovada"
        requisicao.aprovado_por = "Gerente"
        print(f"✅ Gerente aprovou: {requisicao}")
    
    # Diretor aprova até 10000
    elif requisicao.valor <= 10000:
        requisicao.status = "Aprovada"
        requisicao.aprovado_por = "Diretor"
        print(f"✅ Diretor aprovou: {requisicao}")
    
    # CEO aprova qualquer valor
    elif requisicao.valor <= 100000:
        requisicao.status = "Aprovada"
        requisicao.aprovado_por = "CEO"
        print(f"✅ CEO aprovou: {requisicao}")
    
    # Rejeita se passar do limite
    else:
        requisicao.status = "Rejeitada"
        requisicao.aprovado_por = None
        print(f"❌ Rejeitada: {requisicao}")


if __name__ == "__main__":
    print("=" * 60)
    print("SEM PADRÃO - Usando if/elif/else")
    print("=" * 60)
    print()
    
    # Testes
    req1 = Requisicao("001", 500)
    req2 = Requisicao("002", 5000)
    req3 = Requisicao("003", 50000)
    req4 = Requisicao("004", 150000)
    
    for req in [req1, req2, req3, req4]:
        processar_requisicao(req)
        print()
