export default function Loader() {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#020617"
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "6px solid rgba(255,255,255,.14)",
            borderTop: "6px solid #22d3ee",
            animation: "spin 1s linear infinite"
          }}
        />
      </div>
    </>
  );
}
