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


Eduardo -> Prototype

Padrão de Projeto: Prototype (GoF)
Classificação
Tipo: Criacional

Intenção: Permitir a criação de novos objetos a partir de um protótipo por clonagem.

Problema (Sem o Padrão)
Criação de múltiplos objetos similares gera duplicação de código e perda de desempenho.

Solução (Com o Prototype)
Criar um objeto base e cloná-lo, alterando apenas os atributos necessários.

Pontos Fortes✅
Desempenho melhorado, redução de código duplicado e maior flexibilidade.

Pontos Fracos❌
Dificuldade em implementar cópia profunda e risco de bugs.

Quando Usar
Quando a criação de objetos é custosa ou há muitas variações de estruturas semelhantes


Gabriel -> Strategy

Padrão de Projeto: Strategy (GoF)

Classificação
Tipo: Comportamental (Behavioral)

Intenção
Permitir que uma família de algoritmos seja encapsulada em classes separadas e tornados intercambiáveis. O algoritmo pode variar independentemente do cliente que o utiliza.

Problema (Sem o Padrão)
No código original do Camera CLI, o processamento de imagem era feito em uma única função `process_frame()` com uma cadeia de `if/elif` para cada filtro (flip, brilho/contraste, bordas, zoom, inversão). Adicionar um novo efeito exigia modificar a função, aumentando a complexidade e violando o Princípio Aberto/Fechado.

Solução (Com o Strategy)
Cada algoritmo de processamento foi isolado em sua própria classe implementando a interface `ImageFilter`:
- `FlipFilter` - espelha a imagem
- `BrightnessContrastFilter` - ajusta brilho e contraste
- `EdgeDetectionFilter` - detecta bordas
- `ZoomFilter` - aplica zoom digital
- `InvertFilter` - inverte cores
- `ImageProcessor` (Context) - gerencia a composição e execução dos filtros

Estrutura
<<interface>>
   ImageFilter
+ process(frame) → frame
      |
      |--- FlipFilter                 (ConcreteStrategy)
      |--- BrightnessContrastFilter   (ConcreteStrategy)
      |--- EdgeDetectionFilter        (ConcreteStrategy)
      |--- ZoomFilter                 (ConcreteStrategy)
      |--- InvertFilter               (ConcreteStrategy)
      |
   ImageProcessor (Context)
+ set_filter(name, filter)
+ remove_filter(name)
+ process(frame)

Arquivos
- `strategy/compadrao.py` — Código refatorado COM o padrão Strategy
- `strategy/sempadrao.py` — Código original SEM o padrão

Pontos Fortes ✅
   Ponto                                        Descrição
Aberto/Fechado              Novos filtros podem ser adicionados sem modificar código existente
Responsabilidade Única      Cada estratégia encapsula exatamente um algoritmo
Intercambialidade           Algoritmos podem ser substituídos em tempo de execução
Testabilidade               Cada estratégia pode ser testada independentemente

Pontos Fracos ❌
   Ponto                                        Descrição
Número de classes           Aumento na quantidade de classes no projeto
Overhead                    Clientes precisam conhecer as diferentes estratégias disponíveis
Comunicação                 Estratégias podem precisar de muitos dados do contexto

Conclusão
O Strategy se mostrou ideal para o Camera CLI, onde múltiplos filtros de imagem precisam ser combinados dinamicamente. A refatoração tornou o código mais modular, extensível e testável. O trade-off do aumento de classes é amplamente compensado pela facilidade de manutenção e adição de novos filtros.

Julia -> Builder

Padrão de Projeto: Builder (GoF)

Classificação
Tipo: Criacional

Intenção
Separar a construção de um objeto complexo da sua representação, permitindo criar diferentes versões do mesmo objeto utilizando o mesmo processo de construção.

Problema (Sem o Padrão)
Quando uma classe possui muitos atributos, seu construtor pode se tornar muito grande e difícil de utilizar. Além disso, é fácil confundir a ordem dos parâmetros, tornando o código menos legível e aumentando a chance de erros.

Solução (Com o Builder)
Foi criada uma classe interna `Builder`, responsável por construir o objeto passo a passo. Dessa forma, cada atributo é definido por métodos específicos e, ao final, o objeto é criado através do método `build()`.

Estrutura

```
Computador
+ processador
+ memoria
+ armazenamento
+ placaVideo
+ rgb
      |
      |--- Builder
            + processador()
            + memoria()
            + armazenamento()
            + placaVideo()
            + rgb()
            + build()
```

Arquivos
- `builder/combuilder` — Código refatorado COM o padrão Builder
- `builder/sembuilder` — Código original SEM o padrão

Pontos Fortes ✅

   Ponto                                        Descrição
Código mais legível           Cada atributo é definido de forma clara durante a construção
Evita construtores grandes    Reduz a quantidade de parâmetros em um único construtor
Facilidade de manutenção      Novos atributos podem ser adicionados sem afetar o código cliente
Menor chance de erros         Evita confusão na ordem dos parâmetros

Pontos Fracos ❌

   Ponto                                        Descrição
Mais código                   Exige a criação da classe Builder
Maior complexidade            Pode ser desnecessário para objetos simples
Mais arquivos                 Dependendo da implementação, aumenta a quantidade de classes

Conclusão

O padrão Builder facilita a criação de objetos complexos, tornando o código mais organizado, legível e de fácil manutenção. Sua utilização reduz erros na construção de objetos e oferece maior flexibilidade para adicionar novos atributos no futuro, sendo uma excelente alternativa quando construtores possuem muitos parâmetros.