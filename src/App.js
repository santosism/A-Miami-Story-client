import TerminalGame from './components/TerminalGame/TerminalGame';

//ResizeEventObserver loop can cause a notification to pop up, but error seems benign and built-in to avoid infinite loops. Stack overflow link has more info on it
//https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded/50387233#50387233
function App() {
 
  return (
    <div>
      <TerminalGame />
    </div>
  );
}


export default App;
