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
    const { nome, curso } = req.body;

  
    if (!nome || !curso) {
      return res.status(400).json({
        mensagem: 'Os campos nome e curso são obrigatórios.',
      });
    }


    const novoAluno = await Aluno.create({ nome, curso });

    res.status(201).json(novoAluno);

  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao cadastrar aluno.',
      erro: error.message,
    });
  }
});


app.put('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, curso } = req.body;

    if (!nome || !curso) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios faltando.' });
    }

    const alunoAtualizado = await Aluno.findByIdAndUpdate(
      id,
      { nome, curso },
      { new: true, runValidators: true }
    );

    if (!alunoAtualizado) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    }

    res.status(200).json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar aluno.',
      erro: error.message,
    });
  }
});

app.delete('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const alunoExcluido = await Aluno.findByIdAndDelete(id);

    if (!alunoExcluido) {
      return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    }

    res.status(200).json({ 
      mensagem: 'Aluno removido com sucesso!',
      aluno: alunoExcluido 
    });
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao deletar aluno.',
      erro: error.message,
    });
  }
});


async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error.message);
  }
}

startServer();