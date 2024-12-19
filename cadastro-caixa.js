const readline = require('readline');
const fs = require('fs');

// Criação da interface de leitura
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let clientes = [];
let produtos = [];

// Função para carregar os clientes e produtos dos arquivos
function carregarDados() {
    if (fs.existsSync('clientes.json')) {
        const data = fs.readFileSync('clientes.json', 'utf8');
        try {
            clientes = JSON.parse(data);
        } catch (error) {
            console.log("Erro ao carregar clientes. Iniciando com uma lista vazia.");
            clientes = [];
        }
    }
    
    if (fs.existsSync('produtos.json')) {
        const data = fs.readFileSync('produtos.json', 'utf8');
        try {
            produtos = JSON.parse(data);
        } catch (error) {
            console.log("Erro ao carregar produtos. Iniciando com uma lista vazia.");
            produtos = [];
        }
    }
}

// Função para salvar os dados de clientes e produtos nos arquivos
function salvarDados() {
    if (!fs.existsSync('clientes.json')) {
        fs.writeFileSync('clientes.json', JSON.stringify([], null, 2));
    }

    if (!fs.existsSync('produtos.json')) {
        fs.writeFileSync('produtos.json', JSON.stringify([], null, 2));
    }

    try {
        fs.writeFileSync('clientes.json', JSON.stringify(clientes, null, 2));
        fs.writeFileSync('produtos.json', JSON.stringify(produtos, null, 2));
        console.log("✔️ Dados salvos com sucesso!");
    } catch (error) {
        console.log("❌ Erro ao salvar os dados:", error.message);
    }
}

// Função para exibir o menu
function mostrarMenu() {
    console.log("\nEscolha uma das opções abaixo:");
    console.log("1. Cadastrar um novo cliente");
    console.log("2. Editar dados de um cliente");
    console.log("3. Excluir um cliente");
    console.log("4. Cadastrar um novo produto");
    console.log("5. Editar dados de um produto");
    console.log("6. Excluir um produto");
    console.log("7. Mostrar lista de clientes");
    console.log("8. Mostrar lista de produtos");
    console.log("9. Registrar pagamento de produto");
    console.log("10. Exibir créditos");
    console.log("11. Sair do sistema");
}

// Função para mostrar a mensagem de boas-vindas
function mostrarBoasVindas() {
    console.log("\nBem-vindo ao sistema de cadastro de clientes e produtos.");
}

// Função para cadastrar cliente
function cadastrarCliente() {
    console.log("\n--- Cadastro de Cliente ---");

    rl.question("Digite o nome completo do cliente: ", (nome) => {
        rl.question("Digite o email do cliente: ", (email) => {
            rl.question("Digite o CPF do cliente: ", (cpf) => {
                rl.question("Digite o telefone do cliente: ", (telefone) => {
                    rl.question("Digite o endereço do cliente: ", (endereco) => {
                        rl.question("Digite a cidade do cliente: ", (cidade) => {
                            rl.question("Digite o estado do cliente: ", (estado) => {
                                rl.question("Digite o código postal do cliente: ", (codigoPostal) => {
                                    const cliente = { nome, email, cpf, telefone, endereco, cidade, estado, codigoPostal };
                                    clientes.push(cliente);
                                    salvarDados();
                                    console.log(`✔️ Cliente ${nome} cadastrado com sucesso!`);
                                    mostrarMenu();
                                    selecionarOpcao();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Função para cadastrar produto
function cadastrarProduto() {
    console.log("\n--- Cadastro de Produto ---");
    
    rl.question("Digite o nome do produto: ", (nome) => {
        rl.question("Digite o preço do produto: ", (preco) => {
            rl.question("Digite a descrição do produto: ", (descricao) => {
                rl.question("Digite o código de barra do produto: ", (codigoBarra) => {
                    const produto = { nome, preco, descricao, codigoBarra };
                    produtos.push(produto);
                    salvarDados();
                    console.log(`✔️ Produto ${nome} cadastrado com sucesso!`);
                    mostrarMenu();
                    selecionarOpcao();
                });
            });
        });
    });
}

// Função para editar ou excluir produto
function editarOuExcluirProduto(acao) {
    rl.question("Digite o nome do produto: ", (nome) => {
        const produto = produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase());

        if (!produto) {
            console.log("❌ Produto não encontrado.");
            mostrarMenu();
            selecionarOpcao();
            return;
        }

        if (acao === 'editar') {
            console.log(`Produto encontrado: ${produto.nome}`);
            rl.question("Digite o novo nome do produto: ", (novoNome) => {
                rl.question("Digite o novo preço do produto: ", (novoPreco) => {
                    rl.question("Digite a nova descrição do produto: ", (novaDescricao) => {
                        rl.question("Digite o novo código de barra do produto: ", (novoCodigoBarra) => {
                            produto.nome = novoNome;
                            produto.preco = novoPreco;
                            produto.descricao = novaDescricao;
                            produto.codigoBarra = novoCodigoBarra;
                            salvarDados();
                            console.log("✔️ Produto editado com sucesso!");
                            mostrarMenu();
                            selecionarOpcao();
                        });
                    });
                });
            });
        } else if (acao === 'excluir') {
            const index = produtos.indexOf(produto);
            produtos.splice(index, 1);
            salvarDados();
            console.log("✔️ Produto excluído com sucesso!");
            mostrarMenu();
            selecionarOpcao();
        }
    });
}

// Função para registrar pagamento
function registrarPagamento() {
    console.log("\n--- Registrar Pagamento ---");

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        mostrarMenu();
        selecionarOpcao();
        return;
    }

    console.log("Escolha o cliente:");
    clientes.forEach((cliente, index) => {
        console.log(`${index + 1}. Nome: ${cliente.nome}`);
    });

    rl.question("Escolha o número do cliente: ", (clienteIndex) => {
        const clienteSelecionado = clientes[clienteIndex - 1];
        if (!clienteSelecionado) {
            console.log("❌ Cliente não encontrado.");
            mostrarMenu();
            selecionarOpcao();
            return;
        }

        if (produtos.length === 0) {
            console.log("Nenhum produto cadastrado.");
            mostrarMenu();
            selecionarOpcao();
            return;
        }

        console.log("Escolha o produto:");
        produtos.forEach((produto, index) => {
            console.log(`${index + 1}. Nome: ${produto.nome} - Preço: ${produto.preco}`);
        });

        rl.question("Escolha o número do produto: ", (produtoIndex) => {
            const produtoSelecionado = produtos[produtoIndex - 1];
            if (!produtoSelecionado) {
                console.log("❌ Produto não encontrado.");
                mostrarMenu();
                selecionarOpcao();
                return;
            }

            rl.question("Digite o valor pago: ", (valorPago) => {
                const valorPagoNum = parseFloat(valorPago);
                if (isNaN(valorPagoNum)) {
                    console.log("❌ O valor informado não é um número válido.");
                    mostrarMenu();
                    selecionarOpcao();
                    return;
                }

                if (valorPagoNum >= parseFloat(produtoSelecionado.preco)) {
                    const troco = valorPagoNum - parseFloat(produtoSelecionado.preco);
                    if (troco > 0) {
                        console.log(`✔️ Pagamento de ${valorPago} registrado para o cliente ${clienteSelecionado.nome} por ${produtoSelecionado.nome}.`);
                        console.log(`💵 Troco a ser devolvido: ${troco.toFixed(2)}`);
                    } else {
                        console.log(`✔️ Pagamento de ${valorPago} registrado para o cliente ${clienteSelecionado.nome} por ${produtoSelecionado.nome}.`);
                    }
                } else {
                    console.log("❌ O valor pago é insuficiente.");
                }
                mostrarMenu();
                selecionarOpcao();
            });
        });
    });
}

// Função para selecionar a opção do menu
function selecionarOpcao() {
    rl.question("Escolha uma opção: ", (opcao) => {
        switch (opcao) {
            case '1':
                cadastrarCliente();
                break;
            case '2':
                editarOuExcluirProduto('editar');
                break;
            case '3':
                editarOuExcluirProduto('excluir');
                break;
            case '4':
                cadastrarCliente();  // Alterado de cadastrar produto para cadastrar cliente
                break;
            case '5':
                editarOuExcluirProduto('editar');
                break;
            case '6':
                editarOuExcluirProduto('excluir');
                break;
            case '7':
                mostrarListaClientes();
                mostrarMenu();
                selecionarOpcao();
                break;
            case '8':
                mostrarListaProdutos();
                mostrarMenu();
                selecionarOpcao();
                break;
            case '9':
                registrarPagamento();
                break;
            case '10':
                console.log("\nSistema de Cadastro de Clientes e Produtos - Versão 1.0");
                mostrarMenu();
                selecionarOpcao();
                break;
            case '11':
                console.log("Saindo...");
                rl.close();
                break;
            default:
                console.log("❌ Opção inválida.");
                mostrarMenu();
                selecionarOpcao();
                break;
        }
    });
}

// Função para mostrar a lista de clientes
function mostrarListaClientes() {
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
    } else {
        console.log("\nLista de Clientes:");
        clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome} | Email: ${cliente.email} | CPF: ${cliente.cpf} | Telefone: ${cliente.telefone} | Endereço: ${cliente.endereco} | Cidade: ${cliente.cidade} | Estado: ${cliente.estado} | Código Postal: ${cliente.codigoPostal}`);
        });
    }
}

// Função para mostrar a lista de produtos
function mostrarListaProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
    } else {
        console.log("\nLista de Produtos:");
        produtos.forEach(produto => {
            console.log(`Nome: ${produto.nome} | Preço: ${produto.preco} | Descrição: ${produto.descricao} | Código de Barra: ${produto.codigoBarra}`);
        });
    }
}

// Inicia o sistema
carregarDados();
mostrarBoasVindas();
mostrarMenu();
selecionarOpcao();