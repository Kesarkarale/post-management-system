export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position:"fixed",
      top:90,
      right:30,
      zIndex:50,
      background:"linear-gradient(135deg,#0891b2,#14b8a6)",
      color:"#fff",
      padding:"14px 20px",
      borderRadius:14,
      fontWeight:900,
      boxShadow:"0 20px 40px rgba(20,184,166,.24)"
    }}>
      {message}
    </div>
  );
}
