import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      title: `Novo repo ${Date.now()}`,
      url: `http://github.com/danilodecanini`,
      techs: ['React', 'Native']
    }).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
