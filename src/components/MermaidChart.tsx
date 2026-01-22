import { useEffect, useState } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "loose",
  fontFamily: "monospace",
  themeVariables: {
    darkMode: true,
    background: "transparent",
    primaryColor: "#2e1035", // wisteria-950
    primaryTextColor: "#ffffff", // white
    primaryBorderColor: "#ffffff", // white
    lineColor: "#c69fd5", // wisteria-400
    secondaryColor: "#4b2a53", // wisteria-900
    tertiaryColor: "#2e1035", // wisteria-950
    mainBkg: "transparent",
    nodeBorder: "#ffffff",
    clusterBkg: "rgba(75, 42, 83, 0.3)", // wisteria-900 with opacity
    clusterBorder: "#ae7ec0", // wisteria-500
    defaultLinkColor: "#c69fd5", // wisteria-400
    titleColor: "#ffffff",
    edgeLabelBackground: "#2e1035", // wisteria-950
    nodeTextColor: "#ffffff",
  },
});

interface MermaidChartProps {
  chart: string;
}

export function MermaidChart({ chart }: MermaidChartProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart) return;
      
      try {
        setError(null);
        // Generate a unique ID for each render to prevent conflicts
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        console.log("Rendering Mermaid Chart:", id);
        const { svg } = await mermaid.render(id, chart);
        console.log("Mermaid Render Success");
        setSvgContent(svg);
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        setError(`Failed to render chart: ${(err as Error).message}`);
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-lemon-500 font-mono text-sm p-8 text-center">
        <div className="space-y-2">
          <p className="font-bold">MERMAID_RENDER_ERROR</p>
          <p className="opacity-80">{error}</p>
          <pre className="text-xs text-left bg-wisteria-950/50 p-4 rounded mt-4 overflow-auto max-w-full whitespace-pre-wrap">
            {chart}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => zoomIn()}
                className="p-2 bg-wisteria-900/80 backdrop-blur border border-wisteria-600 rounded hover:bg-wisteria-800 text-lemon-50 transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 bg-wisteria-900/80 backdrop-blur border border-wisteria-600 rounded hover:bg-wisteria-800 text-lemon-50 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 bg-wisteria-900/80 backdrop-blur border border-wisteria-600 rounded hover:bg-wisteria-800 text-lemon-50 transition-colors"
                title="Reset View"
              >
                <RotateCcw size={16} />
              </button>
            </div>
            
            <TransformComponent
              wrapperClass="w-full h-full !cursor-grab active:!cursor-grabbing"
              contentClass="w-full h-full flex items-center justify-center"
            >
              <div 
                className="w-full h-full flex items-center justify-center p-8 [&_svg]:max-w-none [&_svg]:w-auto [&_svg]:h-auto"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 text-red-200 font-mono text-sm p-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
