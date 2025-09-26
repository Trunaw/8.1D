import { Link } from "react-router-dom";

export default function Plans() {
  return (
    <div style={{maxWidth: 800, margin: "40px auto"}}>
      <h1>Choose Your Plan</h1>
      <div style={{display: "flex", gap: 20}}>
        <div style={{border: "1px solid #ddd", padding: 20, borderRadius: 8}}>
          <h2>Free</h2>
          <ul>
            <li>Create & view posts</li>
            <li>Basic features</li>
          </ul>
          <button disabled>Current Plan</button>
        </div>
        <div style={{border: "1px solid #ddd", padding: 20, borderRadius: 8}}>
          <h2>Premium — $9.99/month</h2>
          <ul>
            <li>Custom banners</li>
            <li>Analytics dashboard</li>
            <li>Content controls</li>
          </ul>
          <Link to="/checkout"><button>Go Premium</button></Link>
        </div>
      </div>
    </div>
  );
}
