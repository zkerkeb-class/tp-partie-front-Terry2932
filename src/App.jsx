import './App.css'
import { PokemonProvider } from './context/PokemonContext'
import { usePokemon } from './hooks/usePokemon'
import PokeList from './components/pokelist'
import PokeDetails from './components/pokeDetails'
import AddPokemon from './components/addPokemon'

function AppContent() {
  const { currentView } = usePokemon();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎮 Pokédex</h1>
      </header>
      <main className="app-main">
        {currentView === 'list' && <PokeList />}
        {currentView === 'details' && <PokeDetails />}
        {currentView === 'add' && <AddPokemon />}
      </main>
    </div>
  )
}

function App() {
  return (
    <PokemonProvider>
      <AppContent />
    </PokemonProvider>
  )
}

export default App
