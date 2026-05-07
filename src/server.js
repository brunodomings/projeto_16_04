const express = require('express');

const connectDatabase = require('./config/database');
const Aluno = require('./models/Aluno');

const limiter= require('./config/ratelimit');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(limiter);

// Rota inicial
app.get('/', (req, res) => {
  res.json({ mensagem: 'API REST em Node.js com Express.' });
});

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao buscar alunos.',
      erro: error.message,
    });
  }
});


app.post('/alunos', async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    await novoAluno.save();

    res.status(201).json({
      mensagem: 'Aluno criado com sucesso!',
      aluno: novoAluno,
    });
  } catch (error) {
    res.status(400).json({
      mensagem: 'Erro ao criar aluno.',
      erro: error.message,
    });
  }
});

app.put('/alunos/:id', async (req, res) => {
  try {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      mensagem: 'Aluno atualizado com sucesso!',
      aluno: alunoAtualizado,
    });
  } catch (error) {
    res.status(400).json({
      mensagem: 'Erro ao atualizar aluno.',
      erro: error.message,
    });
  }
});


app.delete('/alunos/:id', async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);

    res.json({
      mensagem: 'Aluno deletado com sucesso!',
    });
  } catch (error) {
    res.status(400).json({
      mensagem: 'Erro ao deletar aluno.',
      erro: error.message,
    });
  }
});

// 🚀 Iniciar servidor
async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(` Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Erro ao iniciar servidor:', error.message);
  }
}

startServer();