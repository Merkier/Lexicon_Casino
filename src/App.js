
import './App.css';
import Title from './components/Title'
import MenuItems from './components/MenuItems';
import SlotMachine from './components/SlotMachine'; // <-- Import the new component
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className='SlotFrame'>
      <Title />
      <MenuItems />
      <SlotMachine />
      {/* <Footer /> */}
      </div>

    </div>
  );
}

export default App;
