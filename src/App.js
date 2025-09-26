import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import FindQuestions from './components/FindQuestions';
import Plans from './pages/Plans';
import Checkout from './pages/Checkout';
import NewPost from './pages/NewPost';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/post">New Post</Link> | 
        <Link to="/find-questions">Find Questions</Link> | 
        <Link to="/plans">Plans</Link> | 
        <Link to="/checkout">Checkout</Link> | 
        <Link to="/editor">Editor</Link>
      </nav>
      <Routes>
        <Route path="/post" element={<PostForm />} />
        <Route path="/find-questions" element={<FindQuestions />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/editor" element={<NewPost />} />
        <Route path="/" element={<div>Welcome to DEV@Deakin</div>} />
      </Routes>
    </Router>
  );
}
export default App;
