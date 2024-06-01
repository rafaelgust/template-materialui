import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa,
  tituloTarefa,
  descricaoTarefa,
  inicioTarefa,
  fimTarefa,
  statusTarefa,
  recursoTarefa
) {
  return {
    idTarefa,
    tituloTarefa,
    descricaoTarefa,
    inicioTarefa,
    fimTarefa,
    statusTarefa,
    recursoTarefa
  };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Planejamento do Projeto', 'Definir escopo, cronograma e recursos para o projeto.', '2022-01-01', '2022-01-02', 'Concluída', 'Maria Silva'),
  createData(2, 'Desenvolvimento do Backend', 'Implementar a lógica de negócios e APIs.', '2022-01-03', '2022-01-10', 'Em Andamento', 'João Santos'),
  createData(3, 'Desenvolvimento do Frontend', 'Desenvolver a interface do usuário e integrar com o backend.', '2022-01-04', '2022-01-15', 'Em Andamento', 'Ana Oliveira'),
  createData(4, 'Testes de Unidade', 'Criar e executar testes de unidade para garantir a qualidade do código.', '2022-01-05', '2022-01-12', 'Em Andamento', 'Carlos Souza'),
  createData(5, 'Testes de Integração', 'Testar a integração entre diferentes módulos do sistema.', '2022-01-06', '2022-01-14', 'Em Andamento', 'Fernanda Lima'),
  createData(6, 'Deploy Inicial', 'Realizar o deploy inicial do sistema no ambiente de teste.', '2022-01-07', '2022-01-08', 'Aguardando', 'Ricardo Pereira'),
  createData(7, 'Feedback de Usuários', 'Coletar feedback de usuários para identificar melhorias.', '2022-01-09', '2022-01-16', 'Planejada', 'Mariana Almeida'),
  createData(8, 'Correções de Bugs', 'Corrigir bugs encontrados durante os testes.', '2022-01-10', '2022-01-20', 'Planejada', 'Bruno Costa'),
  createData(9, 'Documentação', 'Documentar o sistema, incluindo requisitos, arquitetura e guia do usuário.', '2022-01-11', '2022-01-18', 'Planejada', 'Juliana Rodrigues'),
  createData(10, 'Treinamento da Equipe', 'Treinar a equipe de suporte para o lançamento do sistema.', '2022-01-12', '2022-01-19', 'Planejada', 'Gustavo Ferreira'),
  createData(11, 'Deploy Final', 'Realizar o deploy final do sistema no ambiente de produção.', '2022-01-13', '2022-01-20', 'Planejada', 'Paula Mendes'),
  createData(12, 'Revisão Pós-Deploy', 'Avaliar a implantação e desempenho do sistema após o deploy.', '2022-01-14', '2022-01-21', 'Planejada', 'Alexandre Rocha'),
];


//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };

    return(
    <>
    <Card>
        <CardHeader
          title="Tarefas"
          subheader="Listagem de Tarefas"
        /> 
        <CardContent>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Data de Início</TableCell>
                    <TableCell align="right">Data de Finalização</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Recurso</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tarefas.map((row, indice) => (
                    <TableRow
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                          {row.idTarefa}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.tituloTarefa}
                      </TableCell>
                      <TableCell align="right">{row.descricaoTarefa}</TableCell>
                      <TableCell align="right">{row.inicioTarefa}</TableCell>
                      <TableCell align="right">{row.fimTarefa}</TableCell>
                      <TableCell align="right">{row.statusTarefa}</TableCell>
                      <TableCell align="right">{row.recursoTarefa}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>            
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>            
                      </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" onClick={handleOpen}>Criar Tarefa</Button>
            <Button size="small" variant="outlined">Cancelar</Button>
      </CardActions> 
    </Card>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarTarefa;