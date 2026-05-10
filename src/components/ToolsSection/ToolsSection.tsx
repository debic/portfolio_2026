import ToolCard from "../ToolCard/ToolCard";
import "./ToolsSection.css";

interface ToolGroup {
  id: number;
  category: string;
  tools: string[];
  colorLeft: string;
  colorRight: string;
}

const TOOLS: ToolGroup[] = [
  {
    id: 1,
    category: "Frontend",
    tools: ["JavaScript", "TypeScript", "React", "HTML, CSS, Sass"],
    colorLeft: "#5A2799",
    colorRight: "#692FB0",
  },
  {
    id: 2,
    category: "Backend",
    tools: ["Node.js", "Express"],
    colorLeft: "#692FB0",
    colorRight: "#7139B7",
  },
  {
    id: 3,
    category: "CMS / Website Builders",
    tools: ["Shopify", "WordPress", "Wix (Velo, and JavaScript)"],
    colorLeft: "#7139B7",
    colorRight: "#8246CC",
  },
];

function ToolsSection(): JSX.Element {
  return (
    <section className="tools-section" id="tools">
      <div className="tools-section__header">
        <h2 className="tools-section__title">Tools I Manage</h2>
        <p className="tools-section__subtitle">
          From building responsive interfaces with React and TypeScript to
          crafting custom Wix and Shopify experiences — these are the
          technologies I work with daily.
        </p>
      </div>
      <div className="tools-section__grid">
        {TOOLS.map((t) => (
          <ToolCard
            key={t.id}
            category={t.category}
            tools={t.tools}
            colorLeft={t.colorLeft}
            colorRight={t.colorRight}
          />
        ))}
      </div>
    </section>
  );
}

export default ToolsSection;
