# Ponderada - Turtlebot teleoperado pt 2

Desenvolvido por Isabelle Beatriz Vasquez Oliveira

**Esse projeto têm como referência o código desenvolvido no projeto SugarZ3ro!**

Este projeto é capaz de realizar a leitura das teclas pressionadas pelo usuário na interface, transmitir imagens em tempo real e a latência das imagens transmitidas pela câmera. Todas essas informações são transmitidas a partir de um publisher no tópico adequado, provocando a movimentação do Turtlebot3 e a transmissão de informações.

O código desenvolvido para a transmissão de vídeo utiliza ROSBridge para realizar a comunicação entre o backend e o frontend e está localizado no arquivo `sender.py`, que deve ser executado na Raspberry Pi onde a câmera deve estar conectada. Mas antes disso, é importante instalar e iniciar o ROSBridge pelos seguintes comandos: 
`sudo apt install ros-humble-rosbridge-suite`
`ros2 launch rosbridge_server rosbridge_websocket_launch.xml`

Após o ROSBridge ser iniciado, é possível iniciar o arquivo `sender.py` também na Raspberry Pi.

Para reproduzir o vídeo da webcam, foi desenvolvido um componente para o frontend em `React.js` com `Vite.js`, encontrado no arquivo `camera.jsx`. Esse componente contém um script que recebe as imagens da câmera por meio da comunicação do ROSBridge via WebSocket executada no arquivo sender.py. É importante verificar se o IP do computador que está executando o arquivo `sender.py` é o mesmo IP no arquivo camera.jsx na seguinte linha:
`url: 'ws://10.128.0.30:9090'`

O mesmo vale para o IP encontrado no arquivo `rosbridge_moviment.jsx` (responsável pela movimentação do Turtlebot3), que também se comunica com o robô pelo frontend por meio do ROSBridge.
```
ros.current = new ROSLIB.Ros({
      url: 'ws://10.128.0.30:9090'
    });
```

O cálculo da latência também foi desenvolvido nesse projeto no arquivo `camera.jsx`, a partir da diferença entre o tempo atual e o tempo de envio dessa imagem. O cálculo, com mais detalhes, pode ser encontrado no arquivo mencionado.

A interface final pode ser visualizada a seguir:
    ![teleopScreen](frontend.png)

O vídeo de demonstração do funcionamento do projeto pode ser encontrado no link a seguir: https://youtu.be/M5_E18tPPcU
Nesse vídeo é possível visualizar a implementação de uma interface web para controle do robô, vizualização das imagens capturadas pela camera e latência do envio dessas imagens.

## Como executar?

**Os requisitos de execução e o tutorial de execução têm como referência a documentação do projeto SugarZ3ro!**

Para executar o projeto corretamente, o usuário deve ter os seguintes pré-requisitos: 

- ROS2 instalado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3 e do computador usado para operá-lo remotamente

- Pacote ROS do Turtlebot 3 instalado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3 e do computador usado para operá-lo remotamente

- Raspberry do Turtlebot 3 e computador usado para operá-lo remotamente conectados na mesma rede wi-fi

- Git instalado no computador usado para operar o robô remotamente

- Pacote ROSBridge do Turtlebot 3 instalado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3 e do computador usado para operá-lo remotamente

- Node.js atualizado no sistema operacional (Linux Ubuntu) da Raspberry do Turtlebot 3

  **Sistema operacional da Raspberry contida no Turtlebot 3**

Essa versão do codigo, requer que a comunicação seja via SSH, portanto é necessario seguir os seguintes passos para execução correta do projeto:
  
No sistema operacional da Raspberry contida no Turtlebot 3 a ser controlado, abra uma janela de terminal e digite os seguintes comandos para limitar a comunicação via ROS a um domínio com ID 5 dentro da rede:

`echo 'export ROS_DOMAIN_ID=5' >> ~/.bashrc`

`source ~/.bashrc`
    
Na mesma janela de terminal, digite o seguinte comando para iniciar a comunicação entre a Raspberry e o microcontrolador do robô, bem como torná-lo apto a receber comandos de movimentação remotamente:

`ros2 launch turtlebot3_bringup robot.launch.py`
    
No sistema operacional do computador que será utilizado para controlar o robô de maneira remota, abra uma janela de terminal e digite o seguinte comando:
`ssh user@server`

Digite a senha de usuário que será solicitada pelo terminal.

Na mesma janela de terminal, digite o seguinte comando para iniciar a comunicação entre a Raspberry e o microcontrolador do robô, bem como torná-lo apto a receber comandos de movimentação remotamente:
`ros2 launch turtlebot3_bringup robot.launch.py`

Na Raspberry, deve ser executado apenas o arquivo `sender.py`.

**Computador que vai controlar o robo**

No sistema operacional do computador que será utilizado para controlar o robô de maneira remota, abra uma janela de terminal no diretório de sua preferência e clone o repositório através do seguinte comando:
`git clone https://github.com/IsabelleVOliveira/ponderada-S7-M6.git`

Na mesma janela de terminal execute os seguintes comandos: cd `src/frontend`

`npm i` 
`npm run build`
`npm run dev`

Ao executar esses comando, deve ser possível visualizar a interface ao digitar o seguinte caminho na url no navegador de sua preferência: `http://localhost:5173/teleopScreen`






