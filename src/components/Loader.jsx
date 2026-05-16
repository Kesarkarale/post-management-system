export default function Loader() {
  return (
    <div style={{
      minHeight:"100vh",
      display:"grid",
      placeItems:"center",
      background:"#020617"
    }}>
      <div style={{
        width:70,
        height:70,
        border:"6px solid rgba(255,255,255,.1)",
        borderTop:"6px solid #22d3ee",
        borderRadius:"50%",
        animation:"spin 1s linear infinite"
      }} />
    </div>
  );
}
