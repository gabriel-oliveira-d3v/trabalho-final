# Trabalho - Padrões de Desenvolvimento

Louise -> Decorator

Padrão de Projeto: Decorator
O que é?
O Decorator é um padrão de projeto estrutural que permite adicionar comportamentos a objetos dinamicamente, sem modificar a classe original.
A ideia central é "embrulhar" um objeto dentro de outro que adiciona funcionalidades — como camadas de uma cebola. O objeto original não sabe que está sendo decorado, e o código que o usa também não precisa saber.

Quando usar?
- Quando você precisa adicionar responsabilidades a objetos de forma flexível e sem criar uma explosão de subclasses
- Quando a herança não é viável por gerar muitas combinações possíveis
- Quando as funcionalidades extras precisam ser combinadas livremente em tempo de execução

Estrutura
<<interface>>
   Lanche
+ descricao() → str
+ preco() → float
      |
      |--- LancheSimples       (Componente concreto)
      |
      |--- LancheDecorator     (Decorator base — mantém referência ao Lanche)
                |
                |--- QueijoDecorator   (Decorator concreto)
                |--- BaconDecorator    (Decorator concreto)
                |--- MolhoDecorator    (Decorator concreto)

Componentes:
- Interface base — define o contrato comum entre objetos e decorators
- Componente concreto — a implementação base, sem extras
- Decorator base — mantém referência ao componente e delega chamadas
- Decorators concretos — adicionam o comportamento extra

Pontos Fortes ✅ 
   Ponto                                        Descrição
Aberto/Fechado             Adiciona funcionalidades sem alterar o código existente
Composição flexível        Combinações livres em qualquer ordem, em tempo de execução
Responsabilidade única     Cada decorator faz uma única coisa
Alternativa à herança      Evita a explosão de subclasses para cada combinação possível


Pontos Fracos ❌
   Ponto                                        Descrição
Ordem importa              A sequência dos decorators pode causar comportamentos inesperados
Debugging difícil          A pilha de chamadas fica longa com muitas camadas
Muitas classes pequenas    Pode gerar muitos arquivos se mal utilizado
Identidade do objeto       Comparar dois objetos decorados pode dar resultados inesperados

Conclusão
O padrão Decorator evita a criação de subclasses para cada combinação possível, permitindo adicionar funcionalidades a objetos de forma flexível e reutilizável. É útil sempre que comportamentos precisam ser combinados livremente, como em pedidos, notificações ou middlewares.

