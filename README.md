# 4food

## Stack
Esse é um projeto de Frontend Web feito utilizando [ReactJS](https://reactjs.org/) e [Redux](https://redux.js.org/); e como gerenciador de pacotes do NodeJS o [npm](https://www.npmjs.com/).
Sobre a divisão dos arquivos, há dois grandes setores. Os `components` são os componentes em si do meu projeto (AppBar, Forms, Cards de Restaurante, entre outros). Já os `Containers` são as páginas em si e podem ser pensadas como a união dos componentes para se mostrar na tela, como Tela de Login, Lista de Restaurantes, Carrinho, entre outros.

## Sobre

### O 4food é um projeto que reproduz basicamente o iFood, nele é possivel:
- Cadastrar um usuario com informações pessoais e de endereço para a entrega
- Fazer o Login
- Ter acesso à pagina onde estão contidos diversos restaurantes, filtros em categorias de restaurante, um campo de texto para pesquisar o restaurante desejado.
- Fazer a navegação entre a home page, carrinho e perfil do usuário.

- Link para acessar o App: [Site](http://superficial-memory.surge.sh/)
- OBS: O app foi desenhado para ser Mobile, então é ideal abrir o link em dispositiveis móveis.

## Instruções para rodar
Por ser um projeto com ReactJS, há a necessidade do NodeJS. 
- Clone o Repositório e com ele em sua máquina: `git clone https://github.com/yansabino/futuretube-frontend.git`
- Agora basta abrir o terminal e navegar até o repositório: `cd futuretube-frontend`
- E então instala-lo e rodar-lo:
    1. `npm install` para instalar todas as dependências;
    1. `npm run start` para rodar localmente o projeto
    1. `npm run build` para gerar uma versão estática do projeto (que ficará na pasta `build`)
