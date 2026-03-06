import { useEffect, useRef } from "react";

const AdsterraSlot = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.firstChild) return;

    const script = document.createElement("script");
    script.src =
      "https://pl28857261.effectivegatecpm.com/33/72/52/337252b1e3ee8763600f572f5458eeeb.js";
    script.async = true;

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 16,
        marginBottom: 16,
      }}
    />
  );
};

export default AdsterraSlot;
