const readline = require('readline');

class No {
    constructor(dado, prioridade = null) {
        this.dado = dado;
        this.prioridade = prioridade;
        this.proximo = null;
    }
}

class ListaEncadeada {
    constructor() {
        this.topo = null;
        this.tamanho = 0;
    }

    inserirNoFinal(dado) {
        const novoNo = new No(dado);

        if (this.topo === null) {
            this.topo = novoNo;
        } else {
            let atual = this.topo;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
        this.tamanho++;
    }

    inserirComPrioridade(dado, prioridade) {
        const novoNo = new No(dado, prioridade);

        if (this.topo === null || this.topo.prioridade < prioridade) {
            novoNo.proximo = this.topo;
            this.topo = novoNo;
        } else {
            let atual = this.topo;
            while (atual.proximo && atual.proximo.prioridade >= prioridade) {
                atual = atual.proximo;
            }
            novoNo.proximo = atual.proximo;
            atual.proximo = novoNo;
        }
        this.tamanho++;
    }

    remover(dado) {
        if (this.topo === null) {
            return null;
        }

        if (this.topo.dado === dado) {
            const removido = this.topo;
            this.topo = this.topo.proximo;
            this.tamanho--;
            return removido;
        }

        let atual = this.topo;
        while (atual.proximo && atual.proximo.dado !== dado) {
            atual = atual.proximo;
        }

        if (atual.proximo) {
            const removido = atual.proximo;
            atual.proximo = atual.proximo.proximo;
            this.tamanho--;
            return removido;
        }

        return null;
    }

    imprimir() {
        let atual = this.topo;
        console.log(`Tamanho da lista: ${this.tamanho}`);

        while (atual) {
            console.log(`Dado: ${atual.dado}, Prioridade: ${atual.prioridade}`);
            atual = atual.proximo;
        }

        console.log('');
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lista = new ListaEncadeada();

function perguntar() {
    rl.question("\n0 - Sair\n1 - Inserir no final\n2 - Inserir com prioridade\n3 - Imprimir\n4 - Remover\n", (opcao) => {
        switch (parseInt(opcao)) {
            case 1: {
                rl.question("Dado: ", (dado) => {
                    lista.inserirNoFinal(parseInt(dado));
                    console.log("Novo elemento inserido.");
                    perguntar();
                });
                break;
            }
            case 2: {
                rl.question("Dado: ", (dado) => {
                    rl.question("Prioridade: ", (prioridade) => {
                        lista.inserirComPrioridade(parseInt(dado), parseInt(prioridade));
                        console.log("Novo elemento inserido com prioridade.");
                        perguntar();
                    });
                });
                break;
            }
            case 3:
                lista.imprimir();
                perguntar();
                break;
            case 4: {
                rl.question("Dado a ser removido: ", (dado) => {
                    const removido = lista.remover(parseInt(dado));
                    if (removido) {
                        console.log(`Elemento removido: Dado: ${removido.dado}, Prioridade: ${removido.prioridade}`);
                    } else {
                        console.log("Elemento não encontrado.");
                    }
                    perguntar();
                });
                break;
            }
            case 0:
                rl.close();
                break;
            default:
                console.log("Opção inválida.");
                perguntar();
                break;
        }
    });
}

perguntar();
