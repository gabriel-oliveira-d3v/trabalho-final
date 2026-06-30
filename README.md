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

# Chain of Responsibility
David K
## O que é?
 
Padrão que passa uma requisição através de uma cadeia de handlers. Cada handler decide se processa ou passa para o próximo.
 
## Cenário
 
Sistema de aprovação de compras com 3 níveis:
- **Gerente**: aprova até R$ 1.000
- **Diretor**: aprova até R$ 10.000
- **CEO**: aprova até R$ 100.000
## Como funciona?
 
```
Requisição R$ 5.000
    ↓
Gerente: "Não consigo (limite 1000)"
    ↓
Diretor: "Consigo! (limite 10000)" → APROVADA
```
 
## Arquivos
 
- `sem_padrao.py` - Solução com if/elif/else (centralizado)
- `com_padrao.py` - Solução com padrão (distribuído)
## Diferenças
 
| Aspecto | Sem Padrão | Com Padrão |
|---------|-----------|-----------|
| Código | Centralizado | Distribuído |
| Estender | Modificar função | Criar classe |
| Testar | Acoplado | Independente |
| SOLID | Não | Sim |
 
## Vantagens do Padrão
 
✅ Fácil adicionar novos handlers  
✅ Cada handler independente  
✅ Código mais organizado  
✅ Testável  
 
## Desvantagens
 
❌ Mais classes  
❌ Mais código inicial  
❌ Debug mais complexo  
 
## Executar
 
```bash
python sem_padrao.py
python com_padrao.py
```
 
---


Ryan -> Factory Method

Factory Method
Categoria
Padrão Criacional (GoF).

Intenção
O Factory Method define uma interface para criação de um objeto, mas deixa que as subclasses decidam qual classe instanciar. Em vez de o código cliente chamar new ClasseConcreta() diretamente, ele chama um método de criação (o "factory method"), que é implementado de forma diferente por cada subclasse.

Em outras palavras: o padrão delega a responsabilidade de instanciar objetos para subclasses especializadas, desacoplando o código que usa o objeto do código que cria o objeto.

Estrutura
Product — interface/classe abstrata comum a todos os objetos criados (no exemplo: Notification).
ConcreteProduct — implementações concretas do Product (EmailNotification, SMSNotification, PushNotification).
Creator — classe abstrata que declara o factory method e pode conter lógica de negócio que usa o produto (NotificationCreator).
ConcreteCreator — subclasse que sobrescreve o factory method para retornar uma instância de um ConcreteProduct específico (EmailNotificationCreator, SMSNotificationCreator, PushNotificationCreator).
Exemplo utilizado neste repositório
Um sistema de envio de notificações (e-mail, SMS, push).

sem-padrao/index.js — o código cliente decide, via if/else, qual classe concreta instanciar. Para adicionar um novo tipo de notificação, é preciso alterar essa função.
com-padrao/index.js — cada tipo de notificação tem seu próprio Creator. O código cliente conhece apenas a abstração NotificationCreator. Para adicionar um novo tipo, basta criar uma nova classe — nenhum código existente precisa ser modificado.
Como executar
node sem-padrao/index.js
node com-padrao/index.js
Pontos fortes
Aderência ao Open/Closed Principle: novos produtos podem ser adicionados criando novas classes, sem alterar código existente.
Baixo acoplamento: o código cliente depende apenas de abstrações (Creator/Product), não de classes concretas.
Centraliza a lógica de criação, facilitando manutenção e testes (é possível testar cada Creator isoladamente, ou criar mocks/stubs).
Facilita a aplicação do Princípio da Responsabilidade Única, já que a criação do objeto é separada da lógica que o utiliza.
Pontos fracos
Aumenta o número de classes no sistema: para cada novo produto é necessário criar também um novo creator, o que pode tornar a hierarquia de classes mais complexa.
Pode ser um exagero (over-engineering) em sistemas pequenos ou que não preveem crescimento no número de variações de objetos.
A abstração adicional pode dificultar a leitura do código para quem não conhece o padrão, exigindo "pular" entre várias classes para entender o fluxo de criação.
Quando usar
Quando uma classe não pode antecipar o tipo de objeto que precisa criar.
Quando o sistema deve ser facilmente extensível com novos tipos de produtos, sem modificar código já existente.
Quando se quer delegar a lógica de criação para subclasses especializadas, mantendo a lógica de negócio comum na superclasse.
Conclusão
O Factory Method resolve um problema bastante comum: evitar que o código cliente fique "amarrado" a classes concretas através de condicionais de criação. Comparado a simplesmente instanciar objetos diretamente, o padrão aumenta a flexibilidade e a capacidade de extensão do sistema, ao custo de mais classes e um nível extra de abstração. Em projetos onde se espera que novos tipos de produtos surjam com frequência (como o exemplo de canais de notificação), o ganho em manutenibilidade compensa claramente esse custo.

Referências
GAMMA, Erich et al. Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.
